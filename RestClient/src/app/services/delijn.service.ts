import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/of";

@Injectable()
export class DeLijnService {
    constructor(private _http: HttpClient) { }

    getVertrekken(): Observable<IVertrekResult> {
        return this._http.get<IVertrekResult>("https://www.delijn.be/rise-api-core/haltes/vertrekken/101139/7")
        // .do(data => { console.log(JSON.stringify(data)) });
    }
    
    vertrekInfo: IVertrekResult;1

    getVertrekkenWithCache(): Observable<IVertrekResult> {
        if (this.vertrekInfo)
            return Observable.of(this.vertrekInfo);
        else
            return this._http.get<IVertrekResult>("https://www.delijn.be/rise-api-core/haltes/vertrekken/101139/7")
                .do(data => { this.vertrekInfo = data; console.log(JSON.stringify(data)) });
    }


}

export interface ILijnen {
    bestemming: string;
    entiteitNummer: number;
    gemeentes?: any;
    haltes?: any;
    id: number;
    internLijnnummer: string;
    kleurAchterGrond: string;
    kleurAchterGrondRand: string;
    kleurVoorGrond: string;
    kleurVoorGrondRand: string;
    lijnGeldigVan?: any;
    lijnNummer: number;
    lijnNummerPubliek: string;
    lijnRichting: string;
    lijnType: string;
    lijnTypeLink: string;
    lijnUrl: string;
    omschrijving: string;
    omschrijvingHighlighted?: any;
    richtingCode: number;
    richtingCodeAndereRichting: number;
    ritNummer: number;
    ritOrder: number;
    vertrekCalendar: any;
    vertrekTijd: string;
    viaBestemming: string;
}

export interface IVertrekResult {
    afstand: number;
    bestemmingen?: any;
    coordinaat?: any;
    entiteitNummer: number;
    halteNummer: number;
    halteUrl: string;
    huidigeDag: string;
    huidigeTijd: string;
    id: number;
    interneLijnnummers?: any;
    laatstGebruikt?: any;
    lijnen: ILijnen[];
    name?: any;
    omleidingen?: any;
    omschrijvingGemeente?: any;
    omschrijvingHighlighted?: any;
    omschrijvingKort?: any;
    omschrijvingLang?: any;
    publiek: boolean;
    storingen: any[];
    syncStatus?: any;
    toegankelijkheidsStatus: any[];
}
