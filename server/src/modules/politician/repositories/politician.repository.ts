import { Repository } from 'typeorm';

import { AppDataSource } from 'src/lib/database/database.providers';

import { Politician } from '../entities/politician.entity';

export const politicianRepository: Repository<Politician> =
  AppDataSource.getRepository(Politician);
