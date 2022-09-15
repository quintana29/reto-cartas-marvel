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
import { ButtonModule } from 'primeng/button';
import { CardModule, } from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';


import { StyleClassModule } from 'primeng/styleclass';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { BadgeModule } from "primeng/badge";
import { SplitterModule } from "primeng/splitter";
import { FieldsetModule, } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    GameModuleRouting,
    ButtonModule,
    CardModule,
    AccordionModule,
    StyleClassModule,
    InputSwitchModule,
    MenubarModule,
    MultiSelectModule,
    BadgeModule,
    SplitterModule,
    FieldsetModule,
    TableModule
    


  ],
  declarations: [GameModuleComponent,
  NewGameComponent,
  HomeComponent,
  JuegosComponent,
  TableroComponent
]
})
export class GameModuleModule { }
