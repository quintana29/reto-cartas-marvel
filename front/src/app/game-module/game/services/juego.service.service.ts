import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Juego } from '../models/juego.model';
import { Observable } from 'rxjs';
import { JuegoModel } from '../models/juego';
import { TableroModel } from '../models/tablero.model';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

constructor(private http: HttpClient) { }

crearJuego(body: Juego){
  return this.http.post('http://localhost:8080/juego/crear/', {...body});
}
listarJuegos(idJugadorPrincipal: string | null):Observable<JuegoModel[]>{
  return this.http.get<JuegoModel[]>(`http://localhost:8080/juego/listar/${idJugadorPrincipal}`);
}

iniciarJuego(body: any) {
  return this.http.post(`http://localhost:8080/juego/iniciar/`, { ...body });
}
crearRonda(body: any) {
  return this.http.post(`http://localhost:8080/juego/crear/ronda/`, { ...body });
}
iniciarRonda(body: any) {
  return this.http.post(`http://localhost:8080/juego/ronda/iniciar/`,{ ...body });
}
ponerCartaEnTablero(body: any) {
  return this.http.post(`http://localhost:8080/juego/poner/`, { ...body });
}
obtenerTableroPorJuego(juegoId: any): Observable<TableroModel> {
  return this.http.get<TableroModel>(`http://localhost:8080/juego/${juegoId}`);
}
obtenerMazoPorJugador(uid:any){
  return this.http.get('http://localhost:8080/jugador/mazo/'+uid);

 }
 obtenerMazo(uid:any, idJuego: any){
  return this.http.get('http://localhost:8080/juego/mazo/'+uid+'/'+idJuego);

 }
 listarTodosLosJuegos(): Observable<JuegoModel[]> {
  return this.http.get<JuegoModel[]>('http://localhost:8080/juegos/');
}

}
