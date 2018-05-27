import { Component, OnInit } from '@angular/core';
import { ICard, PkmTcgService } from '../services/pkmtcg.service';

@Component({
  selector: 'app-Cards',
  templateUrl: './Cards.component.html',
  styleUrls: ['./Cards.component.scss']
})
export class CardsComponent {
  Cards : ICard[];

  constructor(private _svc : PkmTcgService) {}

  ngOnInit() {
    this.getCards(undefined);
  }

  getCards(name: string){
    var filters = [];
    if(name && (name != "")){
      filters.push("name=" + name);
    }
    this._svc.getCards(filters)
            .subscribe(result => this.Cards = result.cards);
  }
}
