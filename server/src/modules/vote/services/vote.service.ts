import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { PaginationService } from 'src/lib/pagination/pagination.service';
import { NotFoundError } from 'src/lib/http-exceptions/errors/types/not-found-error';
import { PoliticianService } from 'src/modules/politician/services/politician.service';
import { BadRequestError } from 'src/lib/http-exceptions/errors/types/bad-request-error';

import {
  alias,
  baseSelect,
  politicianAlias,
  Vote,
  voterAlias,
} from '../entities/vote.entity';
import { voteRepository } from '../repositories/vote.repository';
import type { PaginateVotesPayload } from '../dtos/paginate-votes.dto';
import { PoliticianType } from 'src/modules/politician/enums/politician-type.enum';

@Injectable()
export class VoteService {
  constructor(
    @Inject(forwardRef(() => PoliticianService))
    private readonly politicianService: PoliticianService,
    private readonly paginationService: PaginationService,
  ) {}

  createVoteQueryBuilder() {
    return voteRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.voter`, voterAlias)
      .leftJoinAndSelect(`${alias}.politician`, politicianAlias)
      .select(baseSelect);
  }

  createPerfomaticQueryBuilder() {
    return voteRepository
      .createQueryBuilder(alias)
      .select([
        'vote.id',
        'vote.voter_id',
        'vote.politician_id',
        'vote.politician_type',
      ]);
  }

  async paginateVotes({
    limit,
    page,
    order_by_created_at,
    order_by_updated_at,
    politician_id,
    voter_id,
    politician_type,
  }: PaginateVotesPayload) {
    const queryBuilder = this.createVoteQueryBuilder()
      .where(politician_id ? `${politicianAlias}.id = :politician_id` : '1=1', {
        politician_id,
      })
      .andWhere(voter_id ? `${voterAlias}.id = :voter_id` : '1=1', {
        voter_id,
      })
      .andWhere(
        politician_type
          ? `${politicianAlias}.politician_type = :politician_type`
          : '1=1',
        { politician_type },
      );

    if (order_by_created_at)
      queryBuilder.orderBy('vote.created_at', order_by_created_at);

    if (order_by_updated_at)
      queryBuilder.orderBy('vote.updated_at', order_by_updated_at);

    return this.paginationService.paginateWithQueryBuilder(queryBuilder, {
      limit,
      page,
    });
  }

  async getVoteById(id: string) {
    const vote = await this.createVoteQueryBuilder()
      .where('vote.id = :id', { id })
      .getOne();

    if (!vote) throw new NotFoundError('Voto inválido');

    return vote;
  }

  async getVoteByVoterAndPolitician(voter_id: string, politician_id: string) {
    const vote = await this.createVoteQueryBuilder()
      .where('vote.voter_id = :voter_id', { voter_id })
      .andWhere('politician.id = :politician_id', { politician_id })
      .getOne();

    return vote;
  }

  async getVotesByPoliticianType(
    voter_id: string,
    politician_type: PoliticianType,
  ) {
    const voteByType = await this.createPerfomaticQueryBuilder()
      .where('vote.politician_type = :politician_type', {
        politician_type,
      })
      .andWhere('vote.voter_id = :voter_id', { voter_id })
      .getOne();

    return voteByType;
  }

  async vote(logged_in_user_id: string, politician_id: string) {
    const politician =
      await this.politicianService.getPoliticianById(politician_id);

    const wasVoted = await this.getVotesByPoliticianType(
      logged_in_user_id,
      politician.politician_type,
    );

    if (wasVoted)
      throw new BadRequestError('Voce já votou nesse político, ou no seu tipo');

    const savedVote = await voteRepository.save(
      Vote.create(logged_in_user_id, politician.id, politician.politician_type),
    );

    await this.politicianService.updateVotesAmount(politician, 'increment');

    return savedVote;
  }

  async deleteVote(politician_id: string, logged_in_user_id: string) {
    const voteToDelete = await this.getVoteByVoterAndPolitician(
      logged_in_user_id,
      politician_id,
    );

    if (!voteToDelete) return;

    if (voteToDelete.voter.id !== logged_in_user_id) {
      throw new ForbiddenException(
        'Voce não pode deletar um voto que não é seu',
      );
    }

    await this.politicianService.updateVotesAmount(
      voteToDelete.politician,
      'decrement',
    );

    return voteRepository.remove(voteToDelete);
  }
}
