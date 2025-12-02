import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-pokemon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-pokemon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPokemon {
  pokemoncount = input.required<number>();
  totalPages = input.required<number>();
  currentPage = input.required<number>();
}
