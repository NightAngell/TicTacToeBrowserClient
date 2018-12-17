import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconPadlockComponent } from './shared/icons/icon-padlock/icon-padlock.component';
import { MenuComponent } from './menu/menu.component';
import { TicTacToeSingleplayerComponent } from './tic-tac-toe-singleplayer/tic-tac-toe-singleplayer.component';
import { LobbyComponent } from './multiplayer/lobby/lobby.component';
import { GameComponent } from './multiplayer/game/game.component';
import { WaitingForPlayerModalComponent } from './multiplayer/lobby/waiting-for-player-modal/waiting-for-player-modal.component';
import { WaitingModalComponent } from './shared/components/waiting-modal/waiting-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoModalComponent } from './shared/components/info-modal/info-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    IconPadlockComponent,
    MenuComponent,
    TicTacToeSingleplayerComponent,
    LobbyComponent,
    GameComponent,
    WaitingForPlayerModalComponent,
    WaitingModalComponent,
    InfoModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
