import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/login/service/auth.service';
import { JuegoService } from '../../services/juego.service.service';

import firebase from 'firebase/compat';
import { JuegoModel } from '../../models/juego'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  currentUser!: firebase.User | null;
  dataSource: JuegoModel[] = [];

  constructor(private auth$: AuthService,
    private juego$: JuegoService, private router: Router) { 
      
    }

    async ngOnInit() {
      this.currentUser = await this.auth$.getUserAuth();
      this.juego$.listarJuegos(this.currentUser!.uid).subscribe(juego => this.dataSource=juego)
    }
  btnLogout(): void{
    this.auth$.logout();
  }

  onBoard(){
    this.router.navigate(['/lista/juegos']);
  }

}
