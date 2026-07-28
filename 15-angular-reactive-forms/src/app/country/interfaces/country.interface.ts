/*
 export interface Country {
  name: Name;
  cca3: string;
  borders: string[];
}

export interface Name {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common: string;
}
*/

export interface Country {
  names: {
    common: string;
  };

  codes: {
    alpha_3: string;
  };

  borders: string[];
}