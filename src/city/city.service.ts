import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly cachService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    const cacheKey = `state_${stateId}`;

    return this.cachService.getCache<CityEntity[]>(cacheKey, () =>
      this.cityRepository.find({
        where: { stateId },
      }),
    );
  }

  async findCityById(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found.`);
    }

    return city;
  }
}
