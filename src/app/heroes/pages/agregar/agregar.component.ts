import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {

  public durationInSeconds = 5;

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },{
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ];

  public heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroesSvc: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      console.log('Estas en editar: ', this.router.url.includes('editar')); 
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesSvc.getHeroePorId(id) )
      ).subscribe( heroe => this.heroe = heroe);
  }

  guardar(): any {
    // por lo menos tener el nombre
    if( this.heroe.superhero.trim().length === 0 ) {
      return;
    }


    if( this.heroe.id ) {
      // actualizar
      this.heroesSvc.actualizarHeroe( this.heroe ).subscribe( heroe => {
        this.mostrarSnackBar('Actualizado...');
        // console.log('Actualizando: ',  heroe)
      });
    } else {
      // crear
      this.heroesSvc.agregarHeroe(this.heroe).subscribe( heroe => {
        //console.log('Respuesta', heroe);
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro creado...');
      });
    }

  }

  borrar(): any {
    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    } );
 // TAMBIEN SE PUEDE USAR IM SWITCHMAP CUANDO HAY UN SUSCRIBE QUE DEPENDE DE OTRO SUSCRIBE
    dialog.afterClosed().subscribe(
      (resp => { 
        if( resp ) {
          this.heroesSvc.borrarHeroe( this.heroe.id! ).subscribe( resp => {
            this.router.navigate(['/heroes']);
          });
        }
      })
    );

  }

  mostrarSnackBar( mensaje: string ) {
    this._snackBar.open( mensaje, 'Cerrar', {
      duration: 2500
    } );
  }

}
