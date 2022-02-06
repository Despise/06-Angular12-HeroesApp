import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private baseUrl: string = environment.BASE_HEROES;
private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(
    private http: HttpClient
  ) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1` )
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem( 'token', auth.id ) )
      );
  }


  // of() sirve para crear observables
  verificaAutenticacion(): Observable<boolean> {
    if( !localStorage.getItem('token') ) {
      return of(false);
    }

    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1` )
      .pipe(
        map( auth => {
          this._auth = auth;
            return true;
        })
      );

    //return of(true);
  }

  logout(): any {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
