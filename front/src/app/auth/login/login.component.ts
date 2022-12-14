import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth$: AuthService
  ) { }

  ngOnInit() {
  }

  btnLogin(): void{
    this.auth$.SigninWithGoogle();
  }

}
