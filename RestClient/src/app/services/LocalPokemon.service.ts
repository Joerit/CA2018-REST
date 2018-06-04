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

    getPokemons(filters: string[]): Observable<ILPokemon[]> 
    {
        var url = this._basepath + "pokemon";
        if(filters && (filters.length > 0)){
            url = url + "?" + filters[0];
            for (let index = 1; index < filters.length; index++){
                url = url + "&" + filters[index];
            }
        }
        return this._http.get<ILPokemon[]>(url);
    }

    setPokemon(name, lvl, hp, race, typea, typeb){
        var poke : ILPokemon = {Name: name, Lvl: lvl, Hp: hp, Race: {Name: race, TypeA : typea, TypeB: typeb}};
        this._http.post(this._basepath + "pokemon", poke)
    }
}

export interface ILRace{
    Name: string;
    TypeA: string;
    TypeB: string;
}

export interface ILPokemon{
    Name: string;
    Lvl: number;
    Hp: number;
    Race: ILRace;
}

