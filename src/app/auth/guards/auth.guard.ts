import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( 
    private authSvc: AuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authSvc
        .verificaAutenticacion()
        .pipe(
          tap( estaAuthenticado => {
            if ( !estaAuthenticado ) {
              this.router.navigate( ['./auth/login'] )
            }
          } )
        );

    //   if ( this.authSvc.auth.id ) {
    //     return true;
    //   }
    
    //  console.log('Bloqueado por canActivate');
    //  return false;
  }

  // SOLO PARA PREBENIR QUE SE CARGUE EL MODULO
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authSvc
        .verificaAutenticacion()
        .pipe(
          tap( estaAuthenticado => {
            if ( !estaAuthenticado ) {
              this.router.navigate( ['./auth/login'] )
            }
          } )
        );

      // if ( this.authSvc.auth.id ) {
      //   return true;
      // }

      // console.log('Bloqueado por canLoad');
      // return false;
  }
}
