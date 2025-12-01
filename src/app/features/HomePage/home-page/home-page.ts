import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonService } from '../../Pokemon/services/pokemonService';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  offset = signal(20);
  limit = 20;

  // Recurso reactivo
  pokemons = rxResource({
    request: () => ({ offset: this.offset() }),
    loader: ({ request }) =>
      this.pokemonService.getPokemonList(request.offset, this.limit)
  });

  nextPage() {
    this.offset.update(v => v + 20);
  }

  previousPage() {
    if (this.offset() > 0) {
      this.offset.update(v => v - 20);
    }
  }

  goToDetail(url: string) {
    const id = url.split('/').at(-2);
    this.router.navigate(['/pokemon', id]);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
