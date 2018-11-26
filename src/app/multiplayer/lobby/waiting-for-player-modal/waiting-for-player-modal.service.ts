import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaitingForPlayerModalService {

  modalVisibilityChangeRequest: Subject<boolean> = new Subject();
  constructor() { }

  Show(){
    this.modalVisibilityChangeRequest.next(true);
  }

  Hide(){
    this.modalVisibilityChangeRequest.next(false);
  }
}
