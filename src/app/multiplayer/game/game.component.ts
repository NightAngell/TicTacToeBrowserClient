import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { PositionOnTheField } from './models/position-on-the-field';
import { WaitingModalService } from 'src/app/shared/components/waiting-modal/waiting-modal.service';
import { InfoModalService } from 'src/app/shared/components/info-modal/info-modal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  currentPlayerSymbol: string = "x";
  opponentSymbol: string = "o";
  isWinnerOrDraw: boolean = false;
  readonly gameFields: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""] 
  ];
  subscriptions: Subscription = new Subscription();
  constructor(
    private gameService: GameService,
    private waitingModal: WaitingModalService,
    private infoModal: InfoModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.waitingModal.Show();
    let subscription: Subscription;
    subscription = this.gameService.playerMadeMove.subscribe((position: PositionOnTheField)=>{
      this.gameFields[position.i][position.j] = this.opponentSymbol;
    });
    this.subscriptions.add(subscription);

    subscription = this.gameService.opponentConnected.subscribe(()=>{
      this.waitingModal.Hide();
    });
    this.subscriptions.add(subscription);

    subscription = this.gameService.opponentDisconnected.subscribe(()=>{
      if(this.isWinnerOrDraw) return;
      this.infoModal.Title = "Info";
      this.infoModal.Content = "Connection lost";
      this.infoModal.Show();
    });
    this.subscriptions.add(subscription);

    subscription = this.gameService.playerWin.subscribe(()=>{
      this.isWinnerOrDraw = true;
      this.infoModal.Title = "Congratulations!";
      this.infoModal.Content = "You are winner!";
      this.infoModal.Show();
    });
    this.subscriptions.add(subscription);

    subscription = this.gameService.playerLose.subscribe(()=>{
      this.isWinnerOrDraw = true;
      this.infoModal.Title = "Ouh! You loose";
      this.infoModal.Content = "Next time will be better :)";
      this.infoModal.Show();
    });
    this.subscriptions.add(subscription);

    subscription = this.gameService.playerDraw.subscribe(()=>{
      this.isWinnerOrDraw = true;
      this.infoModal.Title = "Suprise!";
      this.infoModal.Content = "Draw";
      this.infoModal.Show();
    });
    this.subscriptions.add(subscription);

    subscription = this.infoModal.okClicked.subscribe(()=>{
      this.router.navigate(["/lobby"]);
    });
    this.subscriptions.add(subscription);

    this.gameService.StartGame();
  }

  makeMoveIfPossible(i: number, j: number){
    this.gameService.MakeMoveIfPossible(i, j);
  }

  ngOnDestroy(): void {
    this.waitingModal.Hide();
    this.gameService.StopConnectionWithHub();
    this.subscriptions.unsubscribe();
  }
}
