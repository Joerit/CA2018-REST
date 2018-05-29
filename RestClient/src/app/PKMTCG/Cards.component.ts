import { Component, OnInit } from '@angular/core';
import { ITypes, ICards, PkmTcgService, ISet } from '../services/pkmtcg.service';

@Component({
  selector: 'app-Cards',
  templateUrl: './Cards.component.html',
  styleUrls: ['./Cards.component.scss']
})
export class CardsComponent implements OnInit{
  Cards : ICards;
  Types: string[];
  Sets: ISet[];

  constructor(private _svc : PkmTcgService) {
  }

  ngOnInit() {
    this.getCards(undefined, 20, undefined, undefined);
    this.Types = ["No filter"];
    this.Sets = [{name: "No filter", code: ""}];

    this._svc.getTypes()
      .subscribe(res => {
          for (let i = 0; i < res.types.length; i++) {
            this.Types.push(res.types[i]);
          }
        });
    this._svc.getSets().subscribe(res => {
      for (let i = 0; i < res.sets.length; i++) {
        this.Sets.push(res.sets[i]);
      }
    });
  }

  getCards(name: string, pagesize: number, type: string, set: string){
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
    if(set && (set != "")){
      filters.push("setCode=" + set);
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
