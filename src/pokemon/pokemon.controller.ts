import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { ParametersPokemon } from 'src/common/dto/query-parameter.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }
  /* 
  @Query()  toma datos pasados en la url
  para usarlos en una query en la bd
  usando como modelo al dto ParametersPokemon
  para validar la data
  */  
  @Get()
  findAll(@Query() parameterDto: ParametersPokemon) {
    return this.pokemonService.findAll(parameterDto);
  }
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }
  @Patch(':term')
  update(
    @Param('term') term: string, 
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(term, updatePokemonDto);
  }
  @Delete(':term')
  remove(@Param('term', new ParseMongoIdPipe()) term: string) {
    return this.pokemonService.remove(term);
  }
}
