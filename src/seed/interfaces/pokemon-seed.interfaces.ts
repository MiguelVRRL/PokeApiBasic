export interface pokeResponse {
  conut: number;
  next: string;
  previous: null;
  results: Result[];
}
export interface Result {
    name: string;
    url: string;
}