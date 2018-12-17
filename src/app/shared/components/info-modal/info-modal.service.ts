import { Injectable } from '@angular/core';
import { AbstractModal } from '../AbstractModal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoModalService extends AbstractModal{
  
  TitleChanged: Subject<string> = new Subject();
  ContentChanged: Subject<string> = new Subject();

  set Title(title: string){
    this.TitleChanged.next(title);
  }

  set Content(content: string){
    this.ContentChanged.next(content);
  }
}
