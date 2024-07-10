/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource } from 'typeorm';
import { type Seeder, SeederFactoryManager } from 'typeorm-extension';

import { User } from 'src/modules/user/entities/user.entity';
import { createHashedPassword } from 'src/utils/password.utils';

export default class UserSeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const newUser = userRepository.create({
      user_name: 'admin',
      user_email: 'user@example.com',
      hashed_password: await createHashedPassword('password123'),
      user_cpf_number: '503.493.138-90',
      phone_number: '(11) 98945-9239',
      date_of_birth: new Date('2003-12-09')
    });

    await userRepository.save(newUser);
  }
}
