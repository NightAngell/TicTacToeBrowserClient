import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { PositionOnTheField } from './models/position-on-the-field';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  opponentMadeMove: Subject<PositionOnTheField> = new Subject();
  opponentConnected: Subject<{}> = new Subject();
  opponentConnectionLost: Subject<{}> = new Subject();
  gameID: number;
  pingInterval: NodeJS.Timer;
  private _connection: signalR.HubConnection;
  constructor() {
    this._createConnectionHub();
    this._attachEventsToConnection();
  }

  public MakeMoveIfPossible(i: number, j: number){
    this._connection.invoke("MakeMove", i, j);
  }

  private _createConnectionHub(){
    this._connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:62773/gameHub", {
      transport: signalR.HttpTransportType.WebSockets
      | signalR.HttpTransportType.LongPolling
    })
    //.configureLogging(signalR.LogLevel.Trace)
    .build();
  }

  StartGame(){
    this._connection.start().then(()=>{
      this._connection.invoke("JoinToGame", this.gameID).then(()=>{
        this.pingInterval = setInterval(()=>{
          this._connection.invoke("Ping", this.gameID)
        }, 1000);
      });
    });
  }

  StopConnectionWithHub(){
    this._connection.stop();
  }

  private _attachEventsToConnection(){
    this._connection.on("OpponentConnected", ()=>{
      clearInterval(this.pingInterval);
      this._connection.invoke("Ping", this.gameID)
      this.opponentConnected.next();
    });

    this._connection.on("OpponentMadeMove", (iPos, jPos)=>{
      const pos = new PositionOnTheField();
      pos.i = iPos;
      pos.j = jPos
      this.opponentMadeMove.next(pos);
    });
  }
}
