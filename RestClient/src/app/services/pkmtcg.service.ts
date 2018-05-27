import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";

@Injectable()
export class PkmTcgService {
    private _basepath = "https://api.pokemontcg.io/v1/";
    
    private _cardscache: ICards;
    private _cardsquerry: string;
    constructor(private _http: HttpClient) { }

    getCards(filters: string[]): Observable<ICards> {
        var url = this._basepath + "cards";
        if(filters && (filters.length > 0)){
            url = url + "?" + filters[0];
            for (let index = 1; index < filters.length; index++){
                url = url + "&" + filters[index];
            }
        }
        return this.getCardsUrl(url);
    }

    getCardsUrl(url:string) : Observable<ICards>
    {
        if(this._cardsquerry == url){
            return Observable.of(this._cardscache);
        }
        else{
            this._cardsquerry = url;    //save last request as cache

            var httpOptions = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'Authorization': 'my-auth-token'
                })};

            return this._http.get<ICards>(url, { observe: 'response' })
                .map(reply => {
                    var out: ICards = reply.body;
                    var links:string[] = [];
                    if(reply.headers.get("Link")){
                        links = reply.headers.get("Link").split('<');
                    }
                    console.log(links);
                    if(links.length == 3){
                        out.prev = links[1].split('>')[0];
                        out.next = links[2].split('>')[0];
                    }
                    else if(links.length == 5){
                        out.prev = links[4].split('>')[0];
                        out.next = links[3].split('>')[0];
                    }
                    else if(links.length == 0){
                        out.next = "";
                        out.prev = "";
                    }
                    return out;
                    })    
                .do(reply => this._cardscache = reply);
        }
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
    next: string;   //next page url
    prev: string;   //previous page url
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