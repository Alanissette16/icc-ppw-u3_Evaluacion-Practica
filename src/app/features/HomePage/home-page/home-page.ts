import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';

import { HeroPokemon } from '../../Pokemon/components/hero-pokemon/hero-pokemon';
import { PokemonListResponse } from '../../Pokemon/interfaces/pokemonListResponse';
import { PaginationService } from '../../Pokemon/services/paginationService';
import { PokemonService } from '../../Pokemon/services/pokemonService';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroPokemon],
  templateUrl: './home-page.html',
})
export class HomePage {

  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  private paginationService = inject(PaginationService);

  limit = 20;

  offset = computed(() =>
    (this.paginationService.currentPage() - 1) * this.limit
  );

  pokemons = rxResource<PokemonListResponse, { offset: number; limit: number }>({
    params: () => ({
      offset: this.offset(),
      limit: this.limit,
    }),
    stream: ({ params }) =>
      this.pokemonService.getPokemonList(params.offset, params.limit).pipe(
        catchError(() => of({ count: 0, next: null, previous: null, results: [] }))
      ),
  });

  pokemonCount = computed(() => this.pokemons.value()?.count ?? 0);
  totalPages = computed(() => Math.ceil(this.pokemonCount() / this.limit));
  currentPage = computed(() => this.paginationService.currentPage());

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.router.navigate([], {
        queryParams: { page: this.currentPage() + 1 },
        queryParamsHandling: 'merge',
      });
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.router.navigate([], {
        queryParams: { page: this.currentPage() - 1 },
        queryParamsHandling: 'merge',
      });
    }
  }

  goToDetail(url: string) {
    const id = url.split('/').at(-2);
    if (id) this.router.navigate(['/pokemon', id]);
  }

  getPokemonImage(url: string): string {
  const id = url.split('/').at(-2);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
