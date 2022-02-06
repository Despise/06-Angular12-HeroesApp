import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {

    this.authSvc.login().subscribe( (resp: Auth) => {
     // console.log(resp);
  
      if( resp.id ) {
        this.router.navigate( ['./heroes'] );
      }
    
    });
  }

  ingresarSinLogin() {
    this.authSvc.logout();
    this.router.navigate(['/heroes']);
  }

}
