import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VoteModule } from './vote/vote.module';
import { PoliticianModule } from './politician/politician.module';

@Module({
  imports: [UserModule, AuthModule, PoliticianModule, VoteModule],
})
export class ElectionSimulatorModule {}
