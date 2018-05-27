import { Component, OnInit } from '@angular/core';
import { ICards, PkmTcgService } from '../services/pkmtcg.service';

@Component({
  selector: 'app-Cards',
  templateUrl: './Cards.component.html',
  styleUrls: ['./Cards.component.scss']
})
export class CardsComponent {
  Cards : ICards;

  constructor(private _svc : PkmTcgService) {
  }

  ngOnInit() {
    this.getCards(undefined, 20);
  }

  getCards(name: string, pagesize: number){
    var filters = [];
    if(name && (name != "")){
      filters.push("name=" + name);
    }
    if(pagesize && (pagesize != 0)){
      filters.push("pageSize=" + pagesize);
    }
    this._svc.getCards(filters)
            .subscribe(result => this.Cards = result);
  }

  getNext()
  {
    this._svc.getCardsUrl(this.Cards.next)
            .subscribe(result => this.Cards = result);
  }

  getPrev()
  {
    this._svc.getCardsUrl(this.Cards.prev)
            .subscribe(result => this.Cards = result);
  }
}
