import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { RESTCountry, RestCountriesResponse } from '../interfaces/rest-countries.interface';
import { tap, map, Observable, catchError, throwError, delay } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

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
  /*
    searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(
      `${API_URL}/capitals/${query}`,
      { headers }
    ).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap(resp => console.log('Países transformados:', resp)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    );
  }
  */

  searchByCapital(query: string): Observable<Country[]> {

    query = query.toLowerCase();

    return this.http
      .get<RestCountriesResponse>(
        `${API_URL}/capitals?q=${query}`,
        { headers }
      )
      .pipe(
        map(resp =>
          CountryMapper.mapRestCountryArrayToCountryArray(
            resp.data.objects
          )
        ),
        catchError((error) => {
          console.log(error);
          return throwError(
            () => new Error(
              `No se pudo obtener países con ese query ${query}`
            )
          );
        })
      );
  }

  searchOldByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(
      `${API_URL}/capitals?q=${query}`,
      { headers }
    ).pipe(
      tap(resp => console.log('Respuesta cruda API:', resp)),
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
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

    return this.http
      .get<RestCountriesResponse>(
        url,
        { headers }
      )
      .pipe(

        map(resp =>
          CountryMapper.mapRestCountryArrayToCountryArray(
            resp.data.objects
          )
        ),

        delay(2000),

        catchError((error) => {
          console.log('Error fetching ', error);

          return throwError(
            () => new Error(`No se pudo obtener países con ese query ${query}`)
          );
        })
      );

    /*return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    );*/
  }

  searchCountryByAlphaCode(code: string) {
    //const url = `${API_URL}/alpha/${code}`;

    //https://api.restcountries.com/countries/v5/codes.alpha_2/CL
    const url = `${API_URL}/codes.alpha_2/${code}`;

    return this.http
      .get<RestCountriesResponse>(
        url,
        { headers }
      )
      .pipe(

        map(resp =>
          CountryMapper.mapRestCountryArrayToCountryArray(
            resp.data.objects
          )
        ),

        map(countries => countries.at(0)),

        catchError((error) => {
          console.log('Error fetching ', error);

          return throwError(
            () => new Error(`No se pudo obtener países con ese código ${code}`)
          );
        })
      );
    /*
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese código ${code}`)
        );
      })
    );*/
  }
}
