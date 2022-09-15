import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/login/service/auth.service';
import { JuegoService } from '../../services/juego.service.service';
import { WebSocketService } from '../../services/webSocket.service';

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
    private juego$: JuegoService, private router: Router,  private webSocket: WebSocketService) { 
     
  
    }

    async ngOnInit() {
      this.currentUser = await this.auth$.getUserAuth();
      //this.juego$.listarJuegos(this.currentUser!.uid).subscribe(juego => this.dataSource=juego)
      this.juego$.listarTodosLosJuegos().subscribe(juego => this.dataSource=juego)
    }
  btnLogout(): void{
    this.auth$.logout();
  }

  onBoard(){
    this.router.navigate(['tablero']);
  }

  entrar(gameId: string) {
    this.router.navigate([`tablero/${gameId}`]);
  }

  iniciar(gameId: string) {
    this.webSocket.conexion(gameId).subscribe({
     
      next: (event:any) => {
     
        console.log("evento tipo",event.type)
        if(event.type === 'cardgame.tablerocreado'){         
          this.juego$.crearRonda({
              juegoId: gameId,
              tiempo: 80,
              jugadores: event.jugadorIds.map((it:any) => it.uuid) 
          });
        }

        if(event.type == 'cardgame.rondacreada'){
          this.router.navigate(['tablero/'+gameId]);
        }
      },
      error: (err:any) => console.log(err),
      complete: () => console.log('complete')
    });
    
    this.juego$.iniciarJuego({ juegoId: gameId }).subscribe();
  }

}
