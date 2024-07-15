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
      'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15966/production/_100722488_1980-lula-fichado-no-dops.png.webp',
    corruption_scandals_amount: 2,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1945-10-27',
    politician_type: PoliticianType.PRESIDENT,
  },
  {
    politician_name: 'Jair Bolsonaro',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/7/70/2022-09-07_Desfile_C%C3%ADvico-Militar_por_ocasi%C3%A3o_das_Comemora%C3%A7%C3%B5es_do_Bicenten%C3%A1rio_da_Independ%C3%AAncia_do_Brasil_-_52341366768_%28cropped%29.jpg',
    corruption_scandals_amount: 1,
    political_ideology: PoliticianPoliticalIdeology.RIGHT,
    date_of_birth: '1955-03-21',
    politician_type: PoliticianType.PRESIDENT,
  },
  {
    politician_name: 'Dilma Rousseff',
    politician_photo_url:
      'https://miro.medium.com/v2/resize:fit:2350/1*EC93W0kfUaraQhmccZ7-5w.jpeg',
    corruption_scandals_amount: 1,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1947-12-14',
    politician_type: PoliticianType.PRESIDENT,
  },
  {
    politician_name: 'Aécio Neves',
    politician_photo_url:
      'https://www.camara.leg.br/internet/deputado/bandep/74646.jpgmaior.jpg',
    corruption_scandals_amount: 3,
    political_ideology: PoliticianPoliticalIdeology.LEFT,
    date_of_birth: '1960-03-10',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Ciro Gomes',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/e/e2/Ciro_Gomes_%28cropped%29.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.LEFT,
    date_of_birth: '1957-11-06',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Sérgio Moro',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Senadores_da_57%C2%AA_Legislatura_%2852689302414%29.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.RIGHT,
    date_of_birth: '1972-08-01',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Fernando Haddad',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Senadores_da_57%C2%AA_Legislatura_%2852689302414%29.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1963-01-25',
    politician_type: PoliticianType.MAYOR,
  },
  {
    politician_name: 'Marina Silva',
    politician_photo_url:
      'https://www.camara.leg.br/internet/deputado/bandep/220637.jpgmaior.jpg',
    corruption_scandals_amount: 0,
    political_ideology: PoliticianPoliticalIdeology.FAR_LEFT,
    date_of_birth: '1958-02-08',
    politician_type: PoliticianType.CONGRESSPERSON,
  },
  {
    politician_name: 'Geraldo Alckmin',
    politician_photo_url:
      'https://www.camara.leg.br/internet/deputado/bandep/220637.jpgmaior.jpg',
    corruption_scandals_amount: 1,
    political_ideology: PoliticianPoliticalIdeology.LEFT,
    date_of_birth: '1952-11-07',
    politician_type: PoliticianType.GOVERNOR,
  },
  {
    politician_name: 'Michel Temer',
    politician_photo_url:
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Michel_Temer_%28foto_oficial%29.jpg',
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
