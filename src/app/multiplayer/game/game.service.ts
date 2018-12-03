import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { PositionOnTheField } from './models/position-on-the-field';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  opponentMadeMove: Subject<PositionOnTheField> = new Subject();
  opponentConnected: Subject<{}> = new Subject();
  opponentDisconnected: Subject<{}> = new Subject();
  gameID: number;
  gamePassword: string;
  playerId: string;
  private _connection: signalR.HubConnection;
  constructor() {
    this._createConnectionHub();
    this._attachEventsToConnection();
  }

  public MakeMoveIfPossible(i: number, j: number){
    this._connection.invoke(
      "MakeMove",
      i,
      j,
      this.playerId,
      this.gamePassword
    );
  }

  private _createConnectionHub(){
    this._connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:62773/gameHub", {
      transport: signalR.HttpTransportType.WebSockets
      //| signalR.HttpTransportType.LongPolling
    })
    //.configureLogging(signalR.LogLevel.Trace)
    .build();
  }

  StartGame(){
    this._connection.start().then(()=>{
      this._connection.invoke(
          "JoinToGame",
          this.gameID,
          this.playerId,
          this.gamePassword
        ).then(()=>{
      });
    });
  }

  StopConnectionWithHub(){
    this._connection.stop();
  }

  private _attachEventsToConnection(){
    this._connection.on("OpponentJoinedToGame", ()=>{
      this._connection.invoke(
        "NotifyOpponentImAlreadyInRoom",
        this.playerId,
        this.gamePassword
      )
    });

    this._connection.on("AllPlayersJoinedToRoom", ()=>{
      this.opponentConnected.next();
    });

    this._connection.on("OpponentMadeMove", (iPos, jPos)=>{
      const pos = new PositionOnTheField();
      pos.i = iPos;
      pos.j = jPos
      this.opponentMadeMove.next(pos);
    });

    this._connection.on("OpponentDisconnected", ()=>{
      this.opponentDisconnected.next();
    });
  }
}
