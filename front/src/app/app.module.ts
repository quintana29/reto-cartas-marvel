// Libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Routers
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './templates/cards/app.component';

// Components
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/game/pages/login/login.component';
import { HomeComponent } from './modules/game/pages/home/home.component';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { JuegosComponent } from './modules/game/pages/juegos/juegos.component';
import { TableroComponent } from './modules/game/pages/tablero/tablero.component';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    LoginComponent,
    HomeComponent,
    JuegosComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
