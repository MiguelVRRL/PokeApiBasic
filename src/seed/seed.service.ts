import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { pokeResponse } from './interfaces/pokemon-seed.interfaces';
import { map } from 'rxjs';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Pokemon } from "src/pokemon/entities/pokemon.entity";
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  // definimos el httpService
  // con el cual pediremos los datos
  constructor(
    @InjectModel(Pokemon.name) private readonly poke: Model<Pokemon>,
    private readonly http: HttpService,) {}
  async executeSeed() {
    await this.poke.deleteMany({}) // delete * from pokemon
    return  this.http.get<pokeResponse>('http://pokeapi.co/api/v2/pokemon?limit=404',{ 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  })
    .pipe(
      map((res) =>  {
        const pokemonToInsert: CreatePokemonDto[] = [];
        res.data?.results.forEach(async ({ name, url })=>{
          const segment:string[] = url.split('/');
          const no: number = +segment[segment.length-2];
          pokemonToInsert.push({'name':name,'no':no});
        });
        this.poke.insertMany(pokemonToInsert);
        return "seed executed";
      }),
    );
  }
}
