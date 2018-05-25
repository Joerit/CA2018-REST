import { Component, OnInit } from '@angular/core';
import { IStation, IRailService, ILiveBoard } from '../services/IRail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Liveboard',
  templateUrl: './Liveboard.component.html',
  styleUrls: ['./Liveboard.component.scss']
})
export class LiveboardComponent implements OnInit{
  Liveboard : ILiveBoard;

  constructor(private _svc : IRailService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._svc.getLiveboard(params['id'])
        .subscribe(result => this.Liveboard = result);
      // In a real app: dispatch action to load the details here.
    });
  }
}
