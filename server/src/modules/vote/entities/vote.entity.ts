import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from 'src/lib/database/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Politician } from 'src/modules/politician/entities/politician.entity';

@Entity('votes')
export class Vote extends Base {
  @Index()
  @Column('uuid')
  voter_id: string;

  @Index()
  @Column('uuid')
  politician_id: string;

  @ManyToOne(() => Politician, (p) => p.votes)
  @JoinColumn({ name: 'politician_id' })
  politician: Politician;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: 'voter_id' })
  voter: User;

  static create(logged_in_user_id: string, politician_id: string) {
    const item = new Vote();

    item.politician_id = politician_id;
    item.voter_id = logged_in_user_id;

    return item;
  }
}

export const alias = 'vote';
export const voterAlias = 'voter';
export const politicianAlias = 'politician';

export const perfomaticSelect: `${typeof alias}.${keyof Vote}`[] = [
  'vote.politician_id',
  'vote.voter_id',
];

export const baseSelect: (
  | `${typeof alias}.${keyof Vote}`
  | `${typeof voterAlias}.${keyof User}`
  | `${typeof politicianAlias}.${keyof Politician}`
)[] = [
  'vote.id',
  'vote.created_at',
  'vote.updated_at',
  'politician.id',
  'politician.politician_name',
  'politician.political_ideology',
  'politician.votes_amount',
  'voter.id',
  'voter.user_name',
  'voter.user_email',
  'voter.date_of_birth',
];
