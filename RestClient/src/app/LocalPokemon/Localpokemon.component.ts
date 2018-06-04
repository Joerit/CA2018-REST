import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICard, PkmTcgService } from '../services/pkmtcg.service';
import { ILPokemon, LocalPokemonService } from '../services/LocalPokemon.service';

@Component({
  selector: 'app-LocalPokemon',
  templateUrl: './LocalPokemon.component.html',
  styleUrls: ['./LocalPokemon.component.scss']
})
export class LocalPokemonComponent implements OnInit{
  Pokemon: ILPokemon[];
  Races: string[];

  constructor(private _svc : LocalPokemonService) {
  }

  ngOnInit() {
    this.getPokemon(undefined, undefined, undefined);

    this.Races = ["No filter"];
    this._svc.getRaces()
      .subscribe(res => {
          for (let i = 0; i < res.length; i++) {
            this.Races.push(res[i].Name);
          }
        });
  }

  getPokemon(type: string, page: number, pageSize: number){
    var filters = [];
    if(type && (type != "")){
      filters.push("filter=type")
      filters.push("val=" + type);
    }
    if(page){
      filters.push("page=" + page);
    }
    if(pageSize){
      filters.push("pagesize=" + pageSize);
    }
    this._svc.getPokemons(filters)
            .subscribe(result => this.Pokemon = result);
  }

  getPokemonsSort(option: number){
    if(option == 0){
      this._svc.getPokemons(["sort=name"])
            .subscribe(result => this.Pokemon = result);
    }
    else{
      this._svc.getPokemons(["sort=hp"])
            .subscribe(result => this.Pokemon = result);
    }
  }

  setPokemon(name, lvl, hp, race, typea, typeb){
    this._svc.setPokemon(name, lvl, hp, race, typea, typeb);
    this.getPokemon(undefined, undefined, undefined);
  }
}
