import { Repository } from 'typeorm';

import { AppDataSource } from 'src/lib/database/database.providers';

import { Vote } from '../entities/vote.entity';

export const voteRepository: Repository<Vote> =
  AppDataSource.getRepository(Vote);
