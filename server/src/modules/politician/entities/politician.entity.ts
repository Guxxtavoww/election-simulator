import { Column, Entity, Index, OneToMany } from 'typeorm';

import { Base } from 'src/lib/database/entities/base.entity';
import { Vote } from 'src/modules/vote/entities/vote.entity';

import { PoliticianType } from '../enums/politician-type.enum';
import type { CreatePoliticianPayload } from '../dtos/create-politician.dto';
import type { UpdatePoliticianPayload } from '../dtos/update-politician.dto';
import { PoliticianPoliticalIdeology } from '../enums/politician-political-ideology.enum';

@Entity('politicians')
export class Politician extends Base {
  @Index()
  @Column('varchar', { unique: true })
  politician_name: string;

  @Column('varchar')
  politician_photo_url: string;

  @Column('int', { default: 0 })
  corruption_scandals_amount: number;

  @Index()
  @Column('enum', { enum: PoliticianPoliticalIdeology })
  political_ideology: PoliticianPoliticalIdeology;

  @Index()
  @Column('enum', { enum: PoliticianType })
  politician_type: PoliticianType;

  @Column('date', { nullable: true })
  date_of_birth: NullableValue<string>;

  @Column('int', { default: 0 })
  votes_amount: number;

  @OneToMany(() => Vote, (vote) => vote.politician)
  votes: Vote[];

  static create(payload: CreatePoliticianPayload) {
    const item = new Politician();

    Object.assign(item, payload);

    return item;
  }

  static update(payload: UpdatePoliticianPayload) {
    const item = new Politician();

    Object.assign(item, payload);

    return item;
  }
}

export const baseSelect: `politician.${keyof Politician}`[] = [
  'politician.id',
  'politician.date_of_birth',
  'politician.corruption_scandals_amount',
  'politician.politician_photo_url',
  'politician.politician_name',
  'politician.political_ideology',
  'politician.votes_amount',
  'politician.politician_type',
];
