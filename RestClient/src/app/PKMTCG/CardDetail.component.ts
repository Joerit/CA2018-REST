import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICard, PkmTcgService } from '../services/pkmtcg.service';

@Component({
  selector: 'app-CardDetail',
  templateUrl: './CardDetail.component.html',
  styleUrls: ['./CardDetail.component.scss']
})
export class CardDetailComponent implements OnInit{
  Card: ICard;

  constructor(private _svc : PkmTcgService, private _route : ActivatedRoute) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._svc.getCard(params["id"]).subscribe(card => this.Card = card);
    });
    
  }
}
