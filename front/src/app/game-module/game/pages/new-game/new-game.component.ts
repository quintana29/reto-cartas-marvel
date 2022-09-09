import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/auth/login/service/auth.service';

import { Usuario } from '../../models/usario.model';
import { JuegoService } from '../../services/juego.service.service';
import { JugadoresService } from '../../services/jugadores.service';
import firebase from 'firebase/compat';

import { v4 as uuidv4 } from 'uuid';
import { WebSocketService } from '../../services/webSocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit, OnDestroy {
  frmJugadores: FormGroup;
  jugadores!: Array<Usuario>;

  currentUser!: firebase.User | null;

  uuid: string;

  constructor(
    private juego$: JuegoService,
    private jugadores$: JugadoresService,
    private websocket$: WebSocketService,
    private auth$: AuthService,
    private router: Router
  ) {
    this.uuid = uuidv4();
    this.frmJugadores = this.createFormJugadores();
  }
  ngOnDestroy(): void {
    this.websocket$.closeConexion();
  }

  async ngOnInit(): Promise<void> {
    this.jugadores = await this.jugadores$.getJugadores();
    this.currentUser = await this.auth$.getUserAuth();

    this.jugadores = this.jugadores.filter(
      (item) => item.id !== this.currentUser?.uid
    );
    this.websocket$.conexion(this.uuid).subscribe({
      next: (message: any) => console.log(message),
      error: (error: any) => console.log(error),
      complete: () => console.log('completado'),
    });
  }

  public submit(): void {
    const gamers = this.frmJugadores.getRawValue();
    gamers.jugadores.push(this.currentUser?.uid);
    console.log('Submit', gamers.jugadores.id);
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }

  btnLogout(): void {
    this.auth$.logout();
  }

  enviarJugador() {
    const listJugadores = this.frmJugadores.getRawValue();
    console.log(listJugadores)
    listJugadores.jugadores.push([this.currentUser!.uid,this.currentUser!.displayName])
    const jugadores: any = {};
   listJugadores.jugadores.forEach((user : (string | number)[]) => {
      jugadores[user[0]] = user[1];
    });

    const juego = {
      juegoId: this.uuid,
      jugadores,
      jugadorPrincipalId: this.currentUser?.uid,
    };
    this.juego$.crearJuego(juego).subscribe((event) => console.log(event));

    this.router.navigate(['/lista/juegos']);
  }
}
