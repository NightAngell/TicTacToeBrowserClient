import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-singleplayer',
  templateUrl: './tic-tac-toe-singleplayer.component.html',
  styleUrls: ['./tic-tac-toe-singleplayer.component.css']
})
export class TicTacToeSingleplayerComponent implements OnInit {

  readonly player: string = "x";
  readonly bot: string = "o";
  currentPlayer: string = "x";
  isWinner: boolean = false;
  isDraw: boolean = false;
  readonly gameFields: string[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  constructor() { }

  ngOnInit() {
  }

  makeMoveIfPossible(i: number, j: number){
    if(!this._isMovePossible(i, j)) return;
    this.gameFields[i][j] = this.currentPlayer;

    let isWinner: boolean = this._isWinner();
    if(isWinner){
      this.isWinner = true;
    } else if(this._isDraw(isWinner)) {
      this.isDraw = true;
    } else {
      this._nextPlayer();
    }
  }

  private _isMovePossible(i: number, j: number): boolean{
    if(this.gameFields[i][j] !== "" 
    || this.isWinner
    || this.isDraw) {
      return false;
    }
    return true;
  }

  private _nextPlayer(){
    if(this.currentPlayer === this.player){
      this.currentPlayer = this.bot;
      this._botMakeMove();
    } else {
      this.currentPlayer = this.player;
    }
  }

  private _isWinner(): boolean{
    for(let i = 0; i < 3; i++){
      if(this._isWinnerHorizontal(i) || this._isWinnerVertical(i)){
        return true;
      }
    }
    
    return this._isWinnerUnderTheSlant();
  }

  /**
   * From 0 to 2
   */
  private _isWinnerHorizontal(line: number){
    return this.gameFields[line][0] === this.currentPlayer 
      && this.gameFields[line][1] === this.currentPlayer
      && this.gameFields[line][2] === this.currentPlayer;
  }

  /**
   * From 0 to 2
   */
  private _isWinnerVertical(line: number){
    return this.gameFields[0][line] === this.currentPlayer 
      && this.gameFields[1][line] === this.currentPlayer
      && this.gameFields[2][line] === this.currentPlayer;
  }

  private _isWinnerUnderTheSlant(){
     return (
        this.gameFields[0][0] === this.currentPlayer 
        && this.gameFields[1][1] === this.currentPlayer 
        && this.gameFields[2][2] === this.currentPlayer)
      || (
        this.gameFields[0][2] === this.currentPlayer
        && this.gameFields[1][1] === this.currentPlayer
        && this.gameFields[2][0] === this.currentPlayer
      )
  }

  private _isDraw(isWinner: boolean): boolean{
    return isWinner === false && this._areAllFieldsFilled();
  }

  private _areAllFieldsFilled(): boolean{
    for(let i = 0; i < this.gameFields.length; i++){
      for(let j = 0; j < this.gameFields[i].length; j++){
        if(this.gameFields[i][j] === ""){
          return false;
        }
      }
    }
    return true;
  }

  private _botMakeMove(){
    let i;
    let j;
    do{
      i = Math.floor((Math.random() * 3) + 0);
      j = Math.floor((Math.random() * 3) + 0);
    } while(!this._isMovePossible(i, j) || i === 3 || j === 3);
    
    this.makeMoveIfPossible(i, j);
  }

}
