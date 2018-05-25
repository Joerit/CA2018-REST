import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { } from "@angular/common"
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class IRailService {
    private _basepath = "https://api.irail.be/";
    private _baseArgs = "?format=json";
    private _stationsCache: IStations;

    constructor(private _http: HttpClient) { }

    getStations(): Observable<IStations> {
        if (this._stationsCache){
            return Observable.of(this._stationsCache);
        }
        else{
            return this._http.get<IStations>(this._basepath + "stations/" + this._baseArgs)
                ._do(data => {this._stationsCache = data});
        }
    }

    getLiveboard(id: string): Observable<ILiveBoard> {
        return this._http.get<ILiveBoard>(this._basepath + "liveboard/" + this._baseArgs + "&id=" + id + "&arrdep=departure")
    }

    
}

export interface IStation{
    id: string;
    locationX: number;
    locationY: number;
    standardname: string;
    name: string;
}

export interface IStations{
    version: string;
    timestamp: number;
    station:IStation[];
}

export interface IVehicle{
    name: string;
    id_link: string;
}

export interface IPlatform{
    name: number;
    normal: boolean;
}

export interface IDeparture{
    id: string;
    delay: number;
    station: string;
    stationinfo: IStation;
    time: number;
    vehicle: string;
    vehicleinfo: IVehicle;
    platform: string;
    platforminfo: IPlatform;
    canceled: boolean;
    left: boolean;
    departureConnection: string;
}

export interface IDepartures{
    number: number;
    departure: IDeparture[];
}

export interface ILiveBoard{
    version: string;
    timestamp: number;
    station: string;
    stationinfo: IStation;
    departures: IDepartures;
  }
