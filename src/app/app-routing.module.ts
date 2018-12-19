import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TicTacToeSingleplayerComponent } from './tic-tac-toe-singleplayer/tic-tac-toe-singleplayer.component';
import { LobbyComponent } from './multiplayer/lobby/lobby.component';
import { GameComponent } from './multiplayer/game/game.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginAndRegistrationComponent } from './auth/loginAndRegistration/loginAndRegistration.component';

const routes: Routes = [
  {path: "", canActivate: [AuthGuard], children: [
    { path: "", component: MenuComponent },
    { path: "ticTacToe", component: TicTacToeSingleplayerComponent },
    { path: "lobby", component: LobbyComponent},
    { path: "multiplayerGame", component: GameComponent },
  ]},
  { path: "login", component: LoginAndRegistrationComponent, data: { isLogin: "1" } },
  { path: "registration", component: LoginAndRegistrationComponent, data: { isLogin: "0" }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
