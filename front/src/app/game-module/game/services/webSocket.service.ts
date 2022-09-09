import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket! : WebSocketSubject<unknown>

constructor() { }

conexion(idJuego : string){
  return this.socket = webSocket(`ws://localhost:8081/retrieve/${idJuego}`)
}

closeConexion(){
  this.socket.unsubscribe();
}

}
