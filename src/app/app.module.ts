import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconPadlockComponent } from './shared/icons/icon-padlock/icon-padlock.component';
import { MenuComponent } from './menu/menu.component';
import { TicTacToeSingleplayerComponent } from './tic-tac-toe-singleplayer/tic-tac-toe-singleplayer.component';
import { LobbyComponent } from './multiplayer/lobby/lobby.component';
import { GameComponent } from './multiplayer/game/game.component';
import { WaitingForPlayerModalComponent } from './multiplayer/lobby/waiting-for-player-modal/waiting-for-player-modal.component';
import { WaitingModalComponent } from './shared/components/waiting-modal/waiting-modal.component';
import { InfoModalComponent } from './shared/components/info-modal/info-modal.component';
import { JwtInterceptor } from './auth/JWT.interceptor';
import { LoginAndRegistrationComponent } from './auth/loginAndRegistration/loginAndRegistration.component';

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
    InfoModalComponent,
    LoginAndRegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
