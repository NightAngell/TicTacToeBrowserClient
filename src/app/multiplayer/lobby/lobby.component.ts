import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from './models/room';
import { LobbyService } from './lobby.service';
import { Router } from '@angular/router';
import { WaitingModalService } from 'src/app/shared/components/waiting-modal/waiting-modal.service';
import { WaitingForPlayerModalService } from './waiting-for-player-modal/waiting-for-player-modal.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

  playerNickName: string = "";
  password: string = "";
  hostedRoomId: number;
  rooms: Room[] = [];
  subscription: Subscription = new Subscription();
  //TODO unsubscribe
  constructor(
    private lobbyService: LobbyService,
    private router: Router,
    private waitingModalService: WaitingModalService,
    private waitingForPlayerModalService: WaitingForPlayerModalService
  ) { }

  ngOnInit() {
    this._requestForListOfRooms();
    this._handleLobbyServiceEvents();
  }

  onRefresh(){
    this._requestForListOfRooms();
  }

  onHost(){
    this.waitingModalService.Show();
    this.lobbyService.HostRoom(this._getHostRoom());
  }

  onRoom(room: Room){
    this.lobbyService.JoinToRoom(room, this.password);
  }

  private _handleLobbyServiceEvents(){
    this.lobbyService.guestJoinToRoom.subscribe((gameId: number)=>{
      this._startTheGame(gameId);
    });

    this.lobbyService.roomCreated.subscribe((roomId: number)=>{
      this.hostedRoomId = roomId;
      this.waitingModalService.Hide();
      this.waitingForPlayerModalService.Show();
    });

    this.lobbyService.roomAborted.subscribe(()=>{
      this._requestForListOfRooms();
      this.waitingModalService.Hide();
    });

    this.lobbyService.playerCannotJoinToRoom.subscribe((reason: string)=>{
      console.log(reason);
      //Wyswietliić w jakims modalu, który kończy sie ok i zamyka, napisac reusable dark info component
    });
  }

  private _startTheGame(gameId: number):void{
    this.router.navigate(["/mutliplayerGame", gameId])
  }

  private _requestForListOfRooms(): void{
    this.lobbyService.getListOfRooms().subscribe((rooms: Room[])=>{
      this.rooms = rooms;
    });
  }

  private _getHostRoom(): Room{
    const room = new Room();
    room.HostNick = this.playerNickName;
    room.Password = this.password;
    return room;
  }

  @HostListener('window:beforeunload') closeConnectionWithHub(){
    //this.lobbyService.StopConnectionWithRoomHub();
    this.lobbyService.AbortRoom(this.hostedRoomId);
  }

  ngOnDestroy(){
    this.lobbyService.StopConnectionWithRoomHub();
  }
}

