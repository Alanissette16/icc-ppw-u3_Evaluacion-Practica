import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { PokemonAbilityContainer, PokemonDetail } from '../../interfaces/pokemonDetail';
import { PokemonService } from '../../services/pokemonService';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pokemon-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailPage {
  private route = inject(ActivatedRoute);
  private service = inject(PokemonService);

  // Obtenemos la señal reactiva del ID y luego los detalles del Pokémon
  pokemonDetail = toSignal<PokemonDetail | null>(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id')) || 1),
      switchMap(id => this.service.getPokemonDetail(id))
    ),
    { initialValue: null }
  );

  formatName(name: string): string {
    return name ? name.replace(/-/g, ' ') : '';
  }

  hasHiddenAbility(): boolean {
    const pokemon = this.pokemonDetail();
    return !!pokemon?.abilities?.some((a: PokemonAbilityContainer) => a.is_hidden);
  }

  getHiddenAbilityClasses(): { [key: string]: boolean } {
    return {
      'badge-success': this.hasHiddenAbility(),
      'badge-error': !this.hasHiddenAbility(),
    };
  }
}
