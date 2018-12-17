import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { PositionOnTheField } from './models/position-on-the-field';
import { WaitingModalService } from 'src/app/shared/components/waiting-modal/waiting-modal.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  currentPlayerSymbol: string = "x";
  opponentSymbol: string = "o";
  isWinner: boolean = false;
  isDraw: boolean = false;
  readonly gameFields: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""] 
  ];
  constructor(
    private gameService: GameService,
    private waitingModal: WaitingModalService
  ) { }

  ngOnInit() {
    this.waitingModal.Show();
    this.gameService.opponentMadeMove.subscribe((position: PositionOnTheField)=>{
      this.gameFields[position.i][position.j] = this.opponentSymbol;
    });

    this.gameService.opponentConnected.subscribe(()=>{
      this.waitingModal.Hide();
    });

    this.gameService.opponentDisconnected.subscribe(()=>{
      console.log("connection lost");
    });

    this.gameService.StartGame();
  }

  makeMoveIfPossible(i: number, j: number){
    //this.gameFields[i][j] = this.currentPlayerSymbol;
    this.gameService.MakeMoveIfPossible(i, j);
  }

  ngOnDestroy(): void {
    this.waitingModal.Hide();
    this.gameService.StopConnectionWithHub();
  }
}
