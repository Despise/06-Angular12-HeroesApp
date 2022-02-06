import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // SIEMPRE VENDRA UN VALOR => !
  // PUEDE SER NULO => ?

  get auth() {
    return this.authSvc.auth;
  }

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.router.navigate( ['./auth'] );
  }

}
