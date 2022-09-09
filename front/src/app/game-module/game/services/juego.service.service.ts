import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Juego } from '../models/juego.model';
import { Observable } from 'rxjs';
import { JuegoModel } from '../models/juego';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

constructor(private http: HttpClient) { }

crearJuego(body: Juego){
  return this.http.post('http://localhost:8080/juego/crear', {...body});
}
listarJuegos(idJugadorPrincipal: string | null):Observable<JuegoModel[]>{
  return this.http.get<JuegoModel[]>(`http://localhost:8080/juego/listar/${idJugadorPrincipal}`);
}

}
