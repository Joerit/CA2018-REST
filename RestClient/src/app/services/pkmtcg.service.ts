import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class PkmTcgService {
    private _basepath = "https://api.pokemontcg.io/v1/";
    
    constructor(private _http: HttpClient) { }

    getCards(filters: string[]): Observable<ICards> {
        var url = this._basepath + "cards";
        if(filters && (filters.length > 0)){
            url = url + "?" + filters[0];
            for (let index = 1; index < filters.length; index++){
                url = url + "&" + filters[index];
            }
        }

        return this._http.get<ICards>(url);
    }
}

export interface ICard{
    id: string;
    name: string;
    nationalPokedexNumber: number;
    imageUrl: string;
    types: string[];
    supertype: string;
    subtype: string;
    evolvesFrom: string;
    hp: number;
    retreatCost: string[];
    number: number;
    artist: string;
    rarity: string;
    series: string;
    set: string;
    setCode: string;
    attacks: IAttack[];
}

export interface ICards{
    cards: ICard[];
}

export interface IAttack{
    cost: string[];
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
}

export interface IWeakness{
    type: string;
    value: string;
}