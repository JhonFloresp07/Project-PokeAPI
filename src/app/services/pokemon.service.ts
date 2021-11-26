import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  baseUrl: string= environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  getPokemons(index){
    return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
  }

  getAllPokemons():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/pokemon`);
  }

}
