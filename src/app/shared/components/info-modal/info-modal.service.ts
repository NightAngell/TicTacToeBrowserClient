import { Injectable } from '@angular/core';
import { AbstractModal } from '../AbstractModal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoModalService extends AbstractModal{
  
  private _title: string;
  private _content: string;

  TitleChanged: Subject<string> = new Subject();
  ContentChanged: Subject<string> = new Subject();

  okClicked: Subject<{}> = new Subject();

  set Title(title: string){
    this._title = title;
    this.TitleChanged.next(title);
  }

  set Content(content: string){
    this._content = content
    this.ContentChanged.next(content);
  }

	get Title(): string {
		return this._title;
	}

	get Content(): string {
		return this._content;
	}
  
}
