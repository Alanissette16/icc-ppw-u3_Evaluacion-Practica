import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-pokemon',
  imports: [],
  templateUrl: './hero-pokemon.html',
  styleUrl: './hero-pokemon.css',
})
export class HeroPokemon {
  pokemoncount = input.required<number>();
  totalPages = input.required<number>();
}
