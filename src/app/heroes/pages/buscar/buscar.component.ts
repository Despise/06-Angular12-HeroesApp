import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesSvc: HeroesService
  ) { }

  ngOnInit(): void {
  }

  buscando() {
    if(this.termino.length > 2) {
      this.heroesSvc.getSugerencias(this.termino.trim()).subscribe(h => {
        this.heroes = h
        console.log('buscando ->', h);
      });
    }
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if(!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;

    console.log('opcionSeleccionada ->', heroe);

    this.termino = heroe.superhero;

    this.heroesSvc.getHeroePorId(heroe.id!).subscribe(h => {
      this.heroeSeleccionado = h
    });
  }

}
