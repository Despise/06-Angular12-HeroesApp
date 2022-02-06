import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.scss']
})
export class HeroeTarjetaComponent implements OnInit {

  // ? => puede ser nulo
  // ! => para forzar que siempre tendra un valor 
  
  @Input() heroe!: Heroe; 

  constructor() { }

  ngOnInit(): void {
  }

}
