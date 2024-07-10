import { ForbiddenException, Injectable } from '@nestjs/common';

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
import { PaginateVotesPayload } from '../dtos/paginate-votes.dto';

@Injectable()
export class VoteService {
  constructor(
    private readonly politicianService: PoliticianService,
    private readonly paginationService: PaginationService,
  ) {}

  private createVoteQueryBuilder() {
    return voteRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.voter`, voterAlias)
      .leftJoinAndSelect(`${alias}.politician`, politicianAlias)
      .select(baseSelect);
  }

  async paginateVotes({
    limit,
    page,
    order_by_created_at,
    order_by_updated_at,
    politician_id,
    voter_id,
  }: PaginateVotesPayload) {
    const queryBuilder = this.createVoteQueryBuilder()
      .where(politician_id ? `${politicianAlias}.id = :politician_id` : '1=1', {
        politician_id,
      })
      .andWhere(voter_id ? `${voterAlias}.id = :voter_id` : '1=1', {
        voter_id,
      });

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
    const vote = await voteRepository
      .createQueryBuilder('v')
      .select(['v.voter_id', 'v.politician_id'])
      .where('v.voter_id = :voter_id', { voter_id })
      .andWhere('v.politician_id = :politician_id', { politician_id })
      .getOne();

    return vote;
  }

  async vote(logged_in_user_id: string, politician_id: string) {
    const wasVoted = await this.getVoteByVoterAndPolitician(
      logged_in_user_id,
      politician_id,
    );

    if (wasVoted) throw new BadRequestError('Voce já votou nesse político');

    const politician =
      await this.politicianService.getPoliticianById(politician_id);

    const savedVote = await voteRepository.save(
      Vote.create(logged_in_user_id, politician.id),
    );

    await this.politicianService.updateVotesAmount(politician, 'increment');

    return savedVote;
  }

  async deleteVote(id: string, logged_in_user_id: string) {
    const voteToDelete = await this.getVoteById(id);

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
