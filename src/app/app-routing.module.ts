import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TicTacToeSingleplayerComponent } from './tic-tac-toe-singleplayer/tic-tac-toe-singleplayer.component';
import { LobbyComponent } from './multiplayer/lobby/lobby.component';
import { GameComponent } from './multiplayer/game/game.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: "", canActivate: [AuthGuard], children: [
    { path: "", component: MenuComponent },
    { path: "ticTacToe", component: TicTacToeSingleplayerComponent },
    { path: "lobby", component: LobbyComponent},
    { path: "multiplayerGame", component: GameComponent },
  ]},
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
