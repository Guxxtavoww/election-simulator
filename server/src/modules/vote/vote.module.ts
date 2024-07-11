import { forwardRef, Module } from '@nestjs/common';

import { VoteService } from './services/vote.service';
import { VoteController } from './controller/vote.controller';
import { PoliticianModule } from '../politician/politician.module';

@Module({
  imports: [forwardRef(() => PoliticianModule)],
  providers: [VoteService],
  controllers: [VoteController],
  exports: [VoteService],
})
export class VoteModule {}
