import { forwardRef, Module } from '@nestjs/common';

import { VoteModule } from '../vote/vote.module';
import { PoliticianService } from './services/politician.service';
import { PoliticianController } from './controllers/politician.controller';

@Module({
  imports: [forwardRef(() => VoteModule)],
  providers: [PoliticianService],
  exports: [PoliticianService],
  controllers: [PoliticianController],
})
export class PoliticianModule {}
