import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as signalR from "@aspnet/signalr";
import { LogLevel } from '@aspnet/signalr';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Room } from './models/room';
import { HubConnectionState } from 'src/app/shared/enums/hub-connection-state.enum';
import { GameService } from '../game/game.service';
import { AuthenticationService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  
  /** @description emit roomId which is also gameId*/
  guestJoinToRoom: Subject<number> = new Subject();

  /*** @description emit room Id */
  roomCreated: Subject<number> = new Subject();
  roomAborted: Subject<{}> = new Subject();

  /*** @description emit reason (why player cannot join to room) */
  playerCannotJoinToRoom: Subject<string> = new Subject();

  private _connection: signalR.HubConnection;
  constructor(
    private _http: HttpClient, 
    private _gameService: GameService, 
    private _auth: AuthenticationService) {
    this._createConnectionHub();
    this._attachEventsToConnectionHub();
  }

  getListOfRooms(): Observable<Room[]> {
    return this._http.get("http://localhost:62773/api/room").pipe(map((roomsArray: [])=>{
      console.log(roomsArray)
      const rooms: Room[] = [];
      roomsArray.forEach(roomJson => {
        const room: Room = new Room();
        room.Id = roomJson["id"];
        room.IsPassword = roomJson["isPassword"];
        room.HostNick = roomJson["hostNick"];
        rooms.push(room);
      });
      return rooms;
    }));
  }

  HostRoom(room: Room): void {
    this._doOnConnectedHubConnection(()=>{
      this._gameService.gamePassword = room.Password;
      this._gameService.isHost = true;
      this._connection.invoke("CreateHostRoom", room).then();
    });
  }

  JoinToRoom(room: Room, password: string, nick :string): void {
    this._doOnConnectedHubConnection(()=>{
      this._gameService.gamePassword = password;
      this._gameService.isHost = false;
      this._connection.invoke("AddGuestToRoom", room.Id, password, nick).then();
    });
  }

  AbortRoom(){
    this._doOnConnectedHubConnection(()=>{
      this._connection.invoke("AbortRoom");
    });
  }

  StopConnectionWithRoomHub(){
    this._connection.stop();
  }

  /**
   *  connecting: 0, connected: 1, reconnecting: 2, disconnected: 4
  */
  private _getConnectionState(): number{
    return this._connection["connection"]["connectionState"];
  }

  private _doOnConnectedHubConnection(method: Function){
    if(this._getConnectionState() === HubConnectionState.Connected){
      method();
    } else {
      this._connection.start().then(()=>{
        method();
      });
    }
  }

  private _createConnectionHub(){
    this._connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:62773/roomHub", {
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: ()=> this._auth.getTokenFromLocalStorage().token
      })
      //.configureLogging(signalR.LogLevel.Trace)
      .build();
  }

  private _attachEventsToConnectionHub(){
    this._connection.on("HostRoomCreated", (roomId: number)=>{
      this._gameService.roomId = roomId;
      this.roomCreated.next(roomId);
    });

    this._connection.on("GuestJoinToRoom", (roomId: number, playerId: string)=>{
      this._gameService.roomId = roomId;
      this._gameService.playerId = playerId;
      this.guestJoinToRoom.next(roomId);
    });

    this._connection.on("PlayerCannotJoinToRoom", (resason: string)=>{
      this.playerCannotJoinToRoom.next(resason);
    });

    this._connection.on("RoomAborted", ()=>{
      this.roomAborted.next();
    });
  }
}
