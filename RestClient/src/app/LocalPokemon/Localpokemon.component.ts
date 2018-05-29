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

  constructor(private _svc : LocalPokemonService) {
  }

  ngOnInit() {
    this._svc.getPokemons().subscribe(pokemon => this.Pokemon);
  }
}
