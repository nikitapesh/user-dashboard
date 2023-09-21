export type PeopleListType = {
  count: number;
  next?: string;
  previous?: string;
  results: Array<{
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    films: string[];
    gender: string;
    homeworld: string;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];
  }>;
};
