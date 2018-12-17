import { Subject } from "rxjs";

export class AbstractModal{
  modalVisibilityChangeRequest: Subject<boolean> = new Subject();
  constructor() { }

  Show(){
    this.modalVisibilityChangeRequest.next(true);
  }

  Hide(){
    this.modalVisibilityChangeRequest.next(false);
  }
}