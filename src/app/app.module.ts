import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconPadlockComponent } from './shared/icons/icon-padlock/icon-padlock.component';
import { MenuComponent } from './menu/menu.component';
import { TicTacToeSingleplayerComponent } from './tic-tac-toe-singleplayer/tic-tac-toe-singleplayer.component';

@NgModule({
  declarations: [
    AppComponent,
    IconPadlockComponent,
    MenuComponent,
    TicTacToeSingleplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
