import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from 'src/lib/database/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Politician } from 'src/modules/politician/entities/politician.entity';
import { PoliticianType } from 'src/modules/politician/enums/politician-type.enum';

@Entity('votes')
export class Vote extends Base {
  @Index()
  @Column('uuid')
  voter_id: string;

  @Index()
  @Column('uuid')
  politician_id: string;

  @Index()
  @Column('enum', { enum: PoliticianType })
  politician_type: PoliticianType;

  @ManyToOne(() => Politician, (p) => p.votes)
  @JoinColumn({ name: 'politician_id' })
  politician: Politician;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: 'voter_id' })
  voter: User;

  static create(
    logged_in_user_id: string,
    politician_id: string,
    politician_type: PoliticianType,
  ) {
    const item = new Vote();

    item.politician_id = politician_id;
    item.voter_id = logged_in_user_id;
    item.politician_type = politician_type;

    return item;
  }
}

export const alias = 'vote';
export const voterAlias = 'voter';
export const politicianAlias = 'politician';

export const baseSelect: (
  | `${typeof alias}.${keyof Vote}`
  | `${typeof voterAlias}.${keyof User}`
  | `${typeof politicianAlias}.${keyof Politician}`
)[] = [
  'vote.id',
  'vote.created_at',
  'vote.updated_at',
  'vote.politician_type',
  'politician.id',
  'politician.politician_name',
  'politician.political_ideology',
  'politician.votes_amount',
  'voter.id',
  'voter.user_name',
  'voter.user_email',
  'voter.date_of_birth',
];
