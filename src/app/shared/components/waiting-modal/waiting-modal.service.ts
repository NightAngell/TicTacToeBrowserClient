import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractModal } from '../AbstractModal';

@Injectable({
  providedIn: 'root'
})
export class WaitingModalService extends AbstractModal {}