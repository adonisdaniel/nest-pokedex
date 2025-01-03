import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeAPIResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  async executeSeed() {

    const { data } = await axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/?limit=10')

    return data.results.map(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      return {
        name,
        no
      }
    });
  }
}
