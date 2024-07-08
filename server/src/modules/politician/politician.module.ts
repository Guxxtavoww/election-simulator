import { Module } from '@nestjs/common';

import { PoliticianService } from './services/politician.service';
import { PoliticianController } from './controllers/politician.controller';

@Module({
  providers: [PoliticianService],
  exports: [PoliticianService],
  controllers: [PoliticianController],
})
export class PoliticianModule {}
