import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor( private auth$: AuthService) { }

  ngOnInit() {
  }

  btnLogout(): void{
    this.auth$.logout();
  }


}
