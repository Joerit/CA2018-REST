import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

@Injectable()
export class LocalPokemonService {
    private _basepath = "http://localhost:51533/api/";
    
    constructor(private _http: HttpClient) { }

    getRaces(): Observable<ILRace[]> 
    {
        var url = this._basepath + "race";
        return this._http.get<ILRace[]>(url)
    }

    getPokemons(): Observable<ILPokemon> 
    {
        var url = this._basepath + "pokemon";
        return this._http.get<ILPokemon>(url)
    }
}

export interface ILRace{
    Id: number;
    Name: string;
    TypeA: string;
    TypeB: string;
}

export interface ILPokemon{
    Id: number;
    Name: string;
    Race: ILRace;
}

