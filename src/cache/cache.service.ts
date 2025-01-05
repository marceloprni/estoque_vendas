import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(
    Key: string,
    functionRequest: () => Promise<T>,
  ): Promise<T> {
    // Tentar obter as cidades do cache
    const allData: T = await this.cacheManager.get(Key);

    // Se as cidades já estiverem em cache, retorná-las
    if (allData) {
      return allData;
    }

    // Caso contrário, busque as cidades no banco de dados
    const cities: T = await functionRequest();

    // Armazene o resultado no cache
    await this.cacheManager.set(Key, cities);

    return cities;
  }
}
