
import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): Country {

    return {

      capital: restCountry.capitals
        ?.map(c => c.name).join(', ') ?? '',

      cca2: restCountry.codes.alpha_2,

      flag: restCountry.flag.emoji,

      flagSvg: restCountry.flag.url_svg,

      /*name: restCountry.translations['spa'].common ?? 'no name',
        restCountry.names.native?.spa?.common ??
        restCountry.names.common,*/
      //name2: restCountry.names.native?.spa?.common ??restCountry.names.common ,
      name : restCountry.names.translations?.spa?.common ?? restCountry.names.native?.spa?.common ?? restCountry.names.common,
      population: restCountry.population,

      region: restCountry.region,

      subRegion: restCountry.subregion,

    };

  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }

}
