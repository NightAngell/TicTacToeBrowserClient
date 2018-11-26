import { Component, OnInit } from '@angular/core';
import { WaitingModalService } from './waiting-modal.service';

@Component({
  selector: 'app-waiting-modal',
  templateUrl: './waiting-modal.component.html',
  styleUrls: ['./waiting-modal.component.css']
})
export class WaitingModalComponent implements OnInit {

  shouldShowWaitingModal: boolean = false;
  constructor(private waitingModalService: WaitingModalService) { }

  ngOnInit() {
    this.waitingModalService.modalVisibilityChangeRequest.subscribe((shouldShowModal: boolean)=>{
      this.shouldShowWaitingModal = shouldShowModal;
    });
  }

}
