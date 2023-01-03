import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { ParametersPokemon } from '../common/dto/query-parameter.dto';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  /*
  el decorador InjectModel hace que podamos "injectar" 
  el modelo previamente creado, usando la interface Model
  teniendo como generico el schema Pokemon 
  */
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit')
  }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  /* 
  funciones para espeficicar una busqueda
  .limit(): toma u numero para limitar el 
  numero de datos pasados en la query.

  .skip(): toma un numero para skipear un cierto numero 
  de datos.

  .sort({ no: 1 }): ordena el numero de columna pasada.
  .select('-__v'): evita mostrar el dato pasado como arg.
  */
  findAll(parameterDto: ParametersPokemon) {
    const { limit = this.defaultLimit, offset = 0} = parameterDto 
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
  }
  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }
    if (!pokemon) {
      throw new NotFoundException('no exist that pokemon');
    }
    return pokemon;
  }
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (pokemon.name) {
      pokemon.name = pokemon.name.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon, ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  async remove(term: string) {
    // const pokemon = await this.findOne(term);
    // await pokemon.deleteOne();
    // const pokemon = await this.pokemonModel.findByIdAndDelete(term);
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: term,
    });
    if (deletedCount === 0) {
      throw new BadRequestException(`pokemon with id not found`);
    }
    return 'pokemon has been deleted';
  }
  private handleExceptions(error) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `value exist in the data base: ${JSON.stringify(error.keyValue)} `,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `can't create pokemon - check server logs `,
    );
  }
}
