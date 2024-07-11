/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataSource } from 'typeorm';
import { type Seeder, SeederFactoryManager } from 'typeorm-extension';

import { Politician } from 'src/modules/politician/entities/politician.entity';
import { PoliticianType } from 'src/modules/politician/enums/politician-type.enum';
import { PoliticianPoliticalIdeology } from 'src/modules/politician/enums/politician-political-ideology.enum';

const politiciansArray = [
  {
    politician_name: 'Lula da Silva',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/4/48/Lula_-_foto_oficial_2007.jpg',
    corruption_scandals_amount: 2,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1945-10-27',
    politician_type: PoliticianType.PRESIDENT,
  },
  {
    politician_name: 'Jair Bolsonaro',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/3/33/Presidente_Jair_Bolsonaro.jpg',
    corruption_scandals_amount: 1,
    political_ideology: PoliticianPoliticalIdeology.RIGHT,
    date_of_birth: '1955-03-21',
    politician_type: PoliticianType.PRESIDENT,
  },
  {
    politician_name: 'Dilma Rousseff',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Dilma_Rousseff_-_foto_oficial_2011-01-09.jpg',
    corruption_scandals_amount: 1,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1947-12-14',
    politician_type: PoliticianType.PRESIDENT,
  },
  {
    politician_name: 'Aécio Neves',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/1/14/A%C3%A9cio_Neves_2015.jpg',
    corruption_scandals_amount: 3,
    political_ideology: PoliticianPoliticalIdeology.LEFT,
    date_of_birth: '1960-03-10',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Ciro Gomes',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/e/e6/Ciro_Gomes_em_2018.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.LEFT,
    date_of_birth: '1957-11-06',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Sérgio Moro',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/f/f1/S%C3%A9rgio_Moro_em_outubro_de_2018.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.RIGHT,
    date_of_birth: '1972-08-01',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Fernando Haddad',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/6/65/Fernando_Haddad_em_18_de_julho_de_2018.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1963-01-25',
    politician_type: PoliticianType.MAYOR,
  },
  {
    politician_name: 'Marina Silva',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/1/18/Marina_Silva_at_2010_Presidential_debate_05.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1958-02-08',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Geraldo Alckmin',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/2/28/Governador_Geraldo_Alckmin.jpg',
    corruption_scandals_amount: 1,
    political_ideology: PoliticianPoliticalIdeology.LEFT,
    date_of_birth: '1952-11-07',
    politician_type: PoliticianType.GOVERNOR,
  },
  {
    politician_name: 'Michel Temer',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/PR-Michel_Temer-2017.jpg',
    corruption_scandals_amount: 2,
    political_ideology: PoliticianPoliticalIdeology.LEFT,
    date_of_birth: '1940-09-23',
    politician_type: PoliticianType.PRESIDENT,
  },
];

export default class PoliticianSeeder implements Seeder {
  track = false;

  async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const politicianRepository = dataSource.getRepository(Politician);

    await Promise.all(
      politiciansArray.map((p) => politicianRepository.save(p)),
    );
  }
}
