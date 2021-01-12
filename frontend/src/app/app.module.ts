import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { EndpointApiService } from './zelda-api.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [EndpointApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
