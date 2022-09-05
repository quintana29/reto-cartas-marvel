import { Injectable } from '@angular/core';


import firebase from 'firebase/compat'

import { Usuario } from '../../game/models/usario.model';
import{AngularFirestore, AngularFirestoreCollection
} from '@angular/fire/compat/firestore'


@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  private usersCollection: AngularFirestoreCollection<Usuario>;
  constructor(
    private storage: AngularFirestore
  ) { 
    this.usersCollection = storage.collection<Usuario>('usuario');
  }

  async getJugadores():Promise<Array<Usuario>> {

    const result = await new Promise<Usuario[]>((resolve, reject) => {


      const query = this.usersCollection;
      query.get().subscribe({
        next: (data) => {
          const usuarios = new Array<Usuario>();
          data.forEach((gamer) => {
            usuarios.push(gamer.data());
          });
          resolve(usuarios);
        },
        error: (error) => {
          console.log(error);
          reject(error);
        }
      });
    });
    return result;
  }

  public addGamer(user: firebase.User | null): void{
    if(user != null){
      const newUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL
      } as Usuario;
      this.usersCollection
      .doc(user.uid)
      .set(newUser)
      .then(()=> console.log('Jugador registrado'))
    }
   
  }
}
