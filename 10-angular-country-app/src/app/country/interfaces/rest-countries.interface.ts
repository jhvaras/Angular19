export interface RESTCountry {

  names: {
    common: string;
    official: string;

    native?: {
      spa?: {
        common: string;
        official: string;
      };
    };

    translations?: {
      spa?: {
        common: string;
        official: string;
      };
    };
  };

  capitals: {
    name: string;
  }[];

  codes: {
    alpha_2: string;
    alpha_3: string;
  };

  flag: {
    emoji: string;
    url_png: string;
    url_svg: string;
  };

  population: number;
  region: string;
  subregion: string;

}

export interface RestCountriesResponse {
  data: {
    objects: RESTCountry[];
  };
}
