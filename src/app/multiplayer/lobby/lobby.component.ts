import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from './models/room';
import { LobbyService } from './lobby.service';
import { Router } from '@angular/router';
import { WaitingModalService } from 'src/app/shared/components/waiting-modal/waiting-modal.service';
import { WaitingForPlayerModalService } from './waiting-for-player-modal/waiting-for-player-modal.service';
import { InfoModalService } from 'src/app/shared/components/info-modal/info-modal.service';

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
  subscriptions: Subscription = new Subscription();

  constructor(
    private lobbyService: LobbyService,
    private router: Router,
    private waitingModalService: WaitingModalService,
    private waitingForPlayerModalService: WaitingForPlayerModalService,
    private infoModalService: InfoModalService
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
    this.lobbyService.JoinToRoom(room, this.password, this.playerNickName);
  }

  private _handleLobbyServiceEvents(){
    let subscription: Subscription;

    subscription = this.lobbyService.guestJoinToRoom.subscribe(()=>{
      this._startTheGame();
    });
    this.subscriptions.add(subscription);

    subscription = this.lobbyService.roomCreated.subscribe((roomId: number)=>{
      this.hostedRoomId = roomId;
      this.waitingModalService.Hide();
      this.waitingForPlayerModalService.Show();
    });
    this.subscriptions.add(subscription);

    subscription = this.lobbyService.roomAborted.subscribe(()=>{
      this._requestForListOfRooms();
      this.waitingModalService.Hide();
    });
    this.subscriptions.add(subscription);

    subscription = this.lobbyService.playerCannotJoinToRoom.subscribe((reason: string)=>{
      this.infoModalService.Title = "Cannot join to room!";
      this.infoModalService.Content = reason;
      this.infoModalService.Show();
    });
    this.subscriptions.add(subscription);
  }

  private _startTheGame():void{
    this.router.navigate(["/multiplayerGame"])
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

  ngOnDestroy(){
    this.lobbyService.StopConnectionWithRoomHub();
    this.subscriptions.unsubscribe();
  }
}

