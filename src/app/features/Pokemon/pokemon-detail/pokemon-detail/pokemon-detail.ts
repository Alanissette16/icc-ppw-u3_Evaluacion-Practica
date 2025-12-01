import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail {
  private route = inject(ActivatedRoute);
  private service = inject(SimpsonsService);

  personaje = toSignal(
    this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.service.getCharacterById(id))
    ),
    { initialValue: null }
  );

}
