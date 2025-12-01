import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonList(offset: number, limit: number = 20) {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetail(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
