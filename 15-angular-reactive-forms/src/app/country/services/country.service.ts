import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of, tap, map } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const headers = {
  'Authorization': 'Bearer rc_live_397955bf8b3f44dd8a231c0f45208f2f'
};
@Injectable({ providedIn: 'root' })
export class CountryService {
  //private baseUrl = 'https://restcountries.com/v3.1';
  private baseUrl = 'https://api.restcountries.com/countries/v5';


  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    console.log({ region });

    const url = `${this.baseUrl}/region/${region}?response_fields=names.common,codes.alpha_3,borders`;
    return this.http.get<any>(url, { headers }).pipe(
      //tap(resp => console.log('RESPUESTA REGION:', resp.data.objects)),
      map(resp => resp.data.objects)
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    //const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    ///codes.alpha_3/PER?response_fields=names.common,codes.alpha_2,borders
    const url = `${this.baseUrl}/codes.alpha_3/${alphaCode}?response_fields=names.common,codes.alpha_3,borders`;
    //return this.http.get<Country>(url, { headers });
    return this.http.get<any>(url, { headers }).pipe(
      map(resp => resp.data.objects[0])
    );
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}
