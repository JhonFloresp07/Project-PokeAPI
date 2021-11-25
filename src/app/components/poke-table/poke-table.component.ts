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

  displayedColumns: string[] = ['position', 'name'];
  pokemons: Pokemon[] = [];
  dataSource: MatTableDataSource<Pokemon>;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private pokeService: PokemonService, private router: Router) {}
  
  ngOnInit(): void{
    this.getPokemons();
  }

  getPokemons(){

    this.pokeService.getAllPokemons().subscribe(
        res => {
          this.pokemons = res.results;
          console.log(res.results);
          this.dataSource = new MatTableDataSource(this.pokemons);
          this.dataSource.paginator = this.paginator;
        },
        err => {//en caso de error se muestra
          console.log(err);
        }
      );
  }
  
  applyFilter(event: Event) {//metodo extraido de la api para los paginadores
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();

    /*if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }

  getRow(row){
    this.router.navigateByUrl(`pokeAbilities/${row.position}`);
  }

}
