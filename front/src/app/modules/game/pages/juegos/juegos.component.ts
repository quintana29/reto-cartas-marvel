import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor(private auth$: AuthService) { }

  ngOnInit() {
  }
  btnLogout(): void{
    this.auth$.logout();
  }

}
