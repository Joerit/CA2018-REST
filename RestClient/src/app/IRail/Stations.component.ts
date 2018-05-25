import { Component, OnInit } from '@angular/core';
import { IStations, IRailService } from '../services/IRail.service';

@Component({
  selector: 'app-Stations',
  templateUrl: './Stations.component.html',
  styleUrls: ['./Stations.component.scss']
})
export class StationsComponent {
  Stations : IStations;

  constructor(private _svc : IRailService) {}

  ngOnInit() {
    this._svc.getStations()
            .subscribe(result => this.Stations = result);
  }
}
