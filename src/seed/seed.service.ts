import { Injectable } from '@nestjs/common';
import { PokeAPIResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {

    await this.pokemonModel.deleteMany();

    const data = await this.http.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/?limit=600')

    const pokemons = data.results.map(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      const pokemon = {
        name,
        no
      }

      return pokemon;
    });

    await this.pokemonModel.insertMany(pokemons);

    return 'Seed executed'
  }
}
