import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { RestCountriesResponse, RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

//const API_URL = 'https://restcountries.com/v3.1';

const API_URL = 'https://api.restcountries.com/countries/v5';
const headers = {
  'Authorization': 'Bearer rc_live_397955bf8b3f44dd8a231c0f45208f2f'
};


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    //return this.http.get<RESTCountry[]>(
    return this.http.get<RestCountriesResponse>(
      `${API_URL}/capitals?q=${query}`,
      { headers }
    )
      .pipe(
        /*tap(resp => {
          console.log(resp);
          console.log(Array.isArray(resp.data.objects));
          console.log(resp.data.objects);
          console.log('RESPUESTA COMPLETA');
          console.log(JSON.stringify(resp, null, 2));
        }),/*/
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          console.log('Error fetching ', error);

          return throwError(
            () => new Error(`No se pudo obtener países con ese query ${query}`)
          );
        })
      );
  }

  searchByCountry(query: string) {
    //const url = `${API_URL}/name/${query}`;
    const url = `${API_URL}/name?q=${query}`;
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RestCountriesResponse>(url,
        { headers }).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(1000),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    );
  }

  searchByRegion(region: Region) {
    //AQUI FALTA MODIFICAR
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheCountry.has(region)) {
      return of(this.queryCacheCountry.get(region) ?? []);
    }

    return this.http.get<RestCountriesResponse>(url,
        { headers }).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${region}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    //const url = `${API_URL}/alpha/${code}`;
    
    const url = `${API_URL}/codes.alpha_2/${code}`;
    return this.http.get<RestCountriesResponse>(url,
        { headers }).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese código ${code}`)
        );
      })
    );
  }
}
