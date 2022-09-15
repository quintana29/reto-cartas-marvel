import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/auth/login/service/auth.service';
import { Carta } from '../../models/tablero.model';
import { JuegoService } from '../../services/juego.service.service';
import { WebSocketService } from '../../services/webSocket.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit {

 
  tiempo: number = 0;
  cartasDelJugador: Carta[] = [];
  cartasDelTablero: Carta[] = [];
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  numeroRonda: number = 0;
  juegoId: string = "";
  uid: string = "";
  roundStarted: boolean = false;
  currentUser!: firebase.User | null;
  btnEstado: boolean = true;
  ganadorRondaId: string = "";


  constructor( private auth$: AuthService,
    private api:JuegoService,
    private websocket$: WebSocketService,
    private juego$: JuegoService,
    private router: Router,
    private route: ActivatedRoute) { }

  
    ngOnInit(): void{
      this.route.params.subscribe((params) => {
        this.juegoId = params['gameId'];
        this.uid = this.auth$.obtenerUsuarioSesion().uid;

        this.api.obtenerMazo(this.uid, this.juegoId).subscribe((element:any) => {
          this.cartasDelJugador = element.cartas;
          console.log("Mazo", this.cartasDelJugador)
        });

        this.juego$.obtenerTableroPorJuego(this.juegoId).subscribe(event=>{
          this.tiempo = event.tiempo;
          this.jugadoresRonda = event.tablero.jugadores.length;
          this.jugadoresTablero = event.tablero.jugadores.length;
          this.numeroRonda = event.ronda.numero;
        });

        this.websocket$.conexion(this.juegoId).subscribe({
          next: (event:any) => {
            if (event.type === 'cardgame.tiempocambiadodeltablero') {
              this.tiempo = event.tiempo;
            }         
            if (event.type === 'cardgame.ponercartaentablero') {           
              this.cartasDelTablero.push({
                cartaId: event.carta.cartaId,
                poder: event.carta.poder,
                estaOculta: event.carta.estaOculta,
                estaHabilitada: event.carta,
                url: event.carta.url
              });
            } 
            if (event.type === 'cardgame.cartaquitadadelmazo') {
              this.cartasDelJugador = this.cartasDelJugador
                .filter((item) => item.cartaId !==  event.carta.cartaId.uuid);
            }
            if(event.type === 'cardgame.cartasasignadasajugador'){
              if(event.ganadorId.uuid === this.uid){
                event.cartasApuesta.forEach((carta: any) => {
                  this.cartasDelJugador.push({
                    cartaId: carta.cartaId.uuid,
                    poder: carta.poder,
                    estaOculta: carta.estaOculta,
                    estaHabilitada: carta.estaHabilitada,
                    url: carta.url
                  });
                });           
              }
            }
            if (event.type === 'cardgame.rondacreada') {
              this.tiempo = event.tiempo;
              this.jugadoresRonda = event.ronda.jugadores.length
              this.numeroRonda=event.ronda.numero;
            }
            if(event.type === 'cardgame.rondaterminada'){
              this.cartasDelTablero = []
            }  
            if(event.type === 'cardgame.rondainiciada'){
              this.cartasDelJugador=this.cartasDelJugador;
              this.roundStarted = false;
            }
            if (event.type === 'cardgame.juegofinalizado') {
              this.ganadorRondaId=event.alias;
            alert("Ganador del Juego: "+this.ganadorRondaId)
            setTimeout(() => { 
              this.router.navigate(['/home']);
            },300);
            }      
          }
      })
      
      })
    
    }
      iniciarRonda(){
        this.websocket$.conexion(this.juegoId).subscribe(data => console.log(data));
        this.juego$.iniciarRonda({
          juegoId: this.juegoId
        }).subscribe( x => console.log(x));
      } 

      moverCarta(cardId:string){
        this.juego$.ponerCartaEnTablero({
          juegoId:this.juegoId,
          cartaId:cardId,
          jugadorId:this.uid
        }).subscribe(e=>console.log(e))

      }
      limpiarTablero(){
        this.cartasDelTablero.length-=this.cartasDelTablero.length;
      }

  btnLogout(): void{
    this.auth$.logout();
  }


}
