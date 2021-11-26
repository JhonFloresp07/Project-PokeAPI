import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})

export class PokeTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'image', 'name'];
  pokemons: Pokemon[] = [];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pokeService: PokemonService, private router: Router) {}
  
  ngOnInit(): void{
    this.getPokemons();
  }

  getPokemons(){
    let pokemonData;
    for (let i = 1; i <= 20; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          /*this.pokemons = res.results;
          console.log(res.results);
          this.dataSource = new MatTableDataSource(this.pokemons);
          this.dataSource.paginator = this.paginator;*/
          //this.pokemons=res.results;
          this.data.push(pokemonData);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        },
        err => {//en caso de error se muestra
          console.log(err);
        }
      );
    }
  }

  getRow(row){
    this.router.navigateByUrl(`pokeAbilities/${row.name}`);
  }

}
