import { Component, OnInit } from '@angular/core';
import { ITypes, ICards, PkmTcgService } from '../services/pkmtcg.service';

@Component({
  selector: 'app-Cards',
  templateUrl: './Cards.component.html',
  styleUrls: ['./Cards.component.scss']
})
export class CardsComponent implements OnInit{
  Cards : ICards;
  Types: string[];

  constructor(private _svc : PkmTcgService) {
  }

  ngOnInit() {
    this.getCards(undefined, 20, undefined);
    this.Types = ["No filter"];
    this._svc.getTypes()
      .subscribe(res => {
          for (let i = 0; i < res.types.length; i++) {
            this.Types.push(res.types[i]);
          }
        });
  }

  getCards(name: string, pagesize: number, type: string){
    var filters = [];
    if(name && (name != "")){
      filters.push("name=" + name);
    }
    if(pagesize && (pagesize != 0)){
      filters.push("pageSize=" + pagesize);
    }
    if(type && (type != "No filter")){
      filters.push("types=" + type);
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
