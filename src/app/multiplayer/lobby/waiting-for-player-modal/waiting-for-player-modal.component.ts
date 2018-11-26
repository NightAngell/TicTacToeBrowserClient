import { Component, OnInit, Input } from '@angular/core';
import { LobbyService } from '../lobby.service';
import { WaitingForPlayerModalService } from './waiting-for-player-modal.service';
import { WaitingModalService } from 'src/app/shared/components/waiting-modal/waiting-modal.service';

@Component({
  selector: 'app-waiting-for-player-modal',
  templateUrl: './waiting-for-player-modal.component.html',
  styleUrls: ['./waiting-for-player-modal.component.css']
})
export class WaitingForPlayerModalComponent implements OnInit {

  @Input() hostedRoomId: number;
  @Input() hostNick: string;
  @Input() hostedRoomPassword: string;
  shouldShowThisModal: boolean = false;
  constructor(
    private lobbyService: LobbyService,
     private modalService: WaitingForPlayerModalService,
     private waitingModalService: WaitingModalService
  ) { }

  ngOnInit() {
    this.modalService.modalVisibilityChangeRequest.subscribe((shouldShow: boolean)=>{
      this.shouldShowThisModal = shouldShow;
    });
  }

  onAbort(){
    this.shouldShowThisModal = false;
    this.waitingModalService.Show();
    this.lobbyService.AbortRoom(this.hostedRoomId);
  }

}
