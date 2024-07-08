import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PoliticianModule } from './politician/politician.module';

@Module({
  imports: [UserModule, AuthModule, PoliticianModule],
})
export class ElectionSimulatorModule {}
