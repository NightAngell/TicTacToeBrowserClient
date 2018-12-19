import { Component, OnInit } from '@angular/core';
import { InfoModalService } from './info-modal.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {

  shouldShowInfoModal: boolean = false;
  title: string = "title";
  content: string = "content";
  constructor(private _infoModal: InfoModalService) { }

  ngOnInit() {
    this._infoModal.modalVisibilityChangeRequest.subscribe((shouldShow: boolean)=>{
      this.shouldShowInfoModal = shouldShow;
    });

    this._infoModal.ContentChanged.subscribe((content: string)=>{
      this.content = content;
    });

    this._infoModal.TitleChanged.subscribe((title: string)=>{
      this.title = title;
    });
  }

  onOk(){
    this.shouldShowInfoModal = false;
    this._infoModal.okClicked.next();
  }

}
