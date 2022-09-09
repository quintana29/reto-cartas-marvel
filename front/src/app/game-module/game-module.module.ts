import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModuleComponent } from './game-module.component';
import { NewGameComponent } from './game/pages/new-game/new-game.component';
import { HomeComponent } from './game/pages/home/home.component';
import { JuegosComponent } from './game/pages/juegos/juegos.component';
import { TableroComponent } from './game/pages/tablero/tablero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { GameModuleRouting } from './game-module-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    GameModuleRouting
  ],
  declarations: [GameModuleComponent,
  NewGameComponent,
  HomeComponent,
  JuegosComponent,
  TableroComponent
]
})
export class GameModuleModule { }
