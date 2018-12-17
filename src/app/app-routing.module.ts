import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TicTacToeSingleplayerComponent } from './tic-tac-toe-singleplayer/tic-tac-toe-singleplayer.component';
import { LobbyComponent } from './multiplayer/lobby/lobby.component';
import { GameComponent } from './multiplayer/game/game.component';

const routes: Routes = [
  { path: "", component: MenuComponent },
  { path: "ticTacToe", component: TicTacToeSingleplayerComponent },
  { path: "lobby", component: LobbyComponent},
  { path: "multiplayerGame", component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
