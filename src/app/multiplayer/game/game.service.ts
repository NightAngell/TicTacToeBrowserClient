import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as signalR from '@aspnet/signalr';
import { PositionOnTheField } from './models/position-on-the-field';
import { AuthenticationService } from 'src/app/auth/auth.service';
import { ConfigurationService } from 'src/app/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  playerMadeMove: Subject<PositionOnTheField> = new Subject();
  opponentConnected: Subject<{}> = new Subject();
  opponentDisconnected: Subject<{}> = new Subject();
  playerWin: Subject<{}> = new Subject();
  playerLose: Subject<{}> = new Subject();
  playerDraw: Subject<{}> = new Subject();

  roomId: number;
  gamePassword: string;
  playerId: string;
  isHost: boolean;
  private _connection: signalR.HubConnection;
  constructor(private _auth: AuthenticationService, private _config: ConfigurationService) {
    this._createConnectionHub();
    this._attachEventsToConnection();
  }

  public MakeMoveIfPossible(i: number, j: number){
    this._connection.invoke(
      "MakeMove",
      i,
      j,
      this.playerId,
      this.gamePassword
    );
  }

  private _createConnectionHub(){
    this._connection = new signalR.HubConnectionBuilder()
    .withUrl(`${this._config.serverAddressBase}/gameHub`, {
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: ()=> this._auth.getToken().token
    })
    //.configureLogging(signalR.LogLevel.Trace)
    .build();
  }

  StartGame(){
    this._connection.start().then(()=>{
      this._connection.invoke(
          "JoinToGame",
          this.roomId,
          this.playerId,
          this.gamePassword
        ).then(()=>{
      });
    });
  }

  StopConnectionWithHub(){
    this._connection.stop();
  }

  private _attachEventsToConnection(){
    this._connection.on("OpponentJoinedToGame", ()=>{
      this._connection.invoke(
        "NotifyOpponentImAlreadyInRoom",
        this.playerId,
        this.gamePassword
      )
    });

    this._connection.on("AllPlayersJoinedToRoom", ()=>{
      this.opponentConnected.next();
    });

    this._connection.on("PlayerMadeMove", (iPos, jPos)=>{
      const pos = new PositionOnTheField();
      pos.i = iPos;
      pos.j = jPos
      this.playerMadeMove.next(pos);
    });

    this._connection.on("Win", ()=>{
      this.playerWin.next();
    });

    this._connection.on("Lose", ()=>{
      this.playerLose.next();
    });

    this._connection.on("Draw", ()=>{
      this.playerDraw.next();
    });

    this._connection.on("OpponentDisconnected", ()=>{
      this.opponentDisconnected.next();
    });
  }
}
