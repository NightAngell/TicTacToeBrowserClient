import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractModal } from 'src/app/shared/components/AbstractModal';

@Injectable({
  providedIn: 'root'
})
export class WaitingForPlayerModalService extends AbstractModal {}
