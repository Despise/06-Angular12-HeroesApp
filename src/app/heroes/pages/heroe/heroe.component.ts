import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private route: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    // LA FORMA QUE YO LO HAGO
    // this.route.params.subscribe(params => { 
    //   console.log(params['id']);
    // });

    // OTRA FORMA DE OBTENER EL PARAMETER
    // const heroId = this.route.snapshot.paramMap.get('id');
    // console.log(heroId);

    // CON DESESTRUCTURACIÓN EN EL ARGUMENTO ({ id }) 
    this.route.params.pipe(
      switchMap(
        ({ id }) => this.heroeService.getHeroePorId(id)
      )).subscribe( (heroe: Heroe) => this.heroe = heroe );

  }

  regresar() {
    this.router.navigate(['heroes/listado']);
  }
}

