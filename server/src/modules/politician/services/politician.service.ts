import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { VoteService } from 'src/modules/vote/services/vote.service';
import { PaginationService } from 'src/lib/pagination/pagination.service';
import { NotFoundError } from 'src/lib/http-exceptions/errors/types/not-found-error';
import { BadRequestError } from 'src/lib/http-exceptions/errors/types/bad-request-error';

import { baseSelect, Politician } from '../entities/politician.entity';
import type { ListPoliticiansType } from '../dtos/list-politicians.dto';
import { politicianRepository } from '../repositories/politician.repository';
import type { CreatePoliticianPayload } from '../dtos/create-politician.dto';
import type { UpdatePoliticianPayload } from '../dtos/update-politician.dto';
import type { PaginatePoliticiansType } from '../dtos/paginate-politicians.dto';

@Injectable()
export class PoliticianService {
  constructor(
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => VoteService))
    private readonly voteService: VoteService,
  ) {}

  private createPoliticianQueryBuilder() {
    return politicianRepository
      .createQueryBuilder('politician')
      .select(baseSelect);
  }

  private handleFilters({
    order_by_date_of_birth,
    order_by_most_votes,
    political_ideology,
    politician_name,
    politician_type,
  }: Omit<PaginatePoliticiansType, 'limit' | 'page'>) {
    const queryBuilder = this.createPoliticianQueryBuilder()
      .where(
        political_ideology
          ? 'politician.political_ideology = :political_ideology'
          : '1=1',
        { political_ideology },
      )
      .andWhere(
        politician_name
          ? 'LOWER(politician.politician_name) LIKE :politician_name'
          : '1=1',
        {
          politician_name: `%${politician_name}%`,
        },
      )
      .andWhere(
        politician_type
          ? 'politician.politician_type = :politician_type'
          : '1=1',
        { politician_type },
      );

    if (order_by_date_of_birth)
      queryBuilder.orderBy('politician.date_of_birth', order_by_date_of_birth);

    if (order_by_most_votes)
      queryBuilder.orderBy('politician.votes_amount', order_by_most_votes);

    return queryBuilder;
  }

  private async addVotedByCurrentUser(
    politicians: Politician[],
    logged_in_user_id: string,
  ) {
    const politicianIds = politicians.map((politician) => politician.id);

    const votedPoliticians = await this.voteService
      .createVoteQueryBuilder(true)
      .where('vote.politician_id IN (:...politicianIds)', { politicianIds })
      .andWhere('vote.voter_id = :logged_in_user_id', { logged_in_user_id })
      .take(politicianIds.length)
      .getMany();

    const politiciansSet = new Set(
      votedPoliticians.map((votedPolitician) => votedPolitician.politician.id),
    );

    return politicians.map((politician) => ({
      ...politician,
      voted_by_current_user: politiciansSet.has(politician.id),
    }));
  }

  async listPoliticians(
    payload: ListPoliticiansType,
    logged_in_user_id: string,
  ) {
    const politicians = await this.handleFilters(payload).getMany();

    return this.addVotedByCurrentUser(politicians, logged_in_user_id);
  }

  async paginatePoliticians(
    { limit, page, ...filters }: PaginatePoliticiansType,
    logged_in_user_id: string,
  ) {
    const paginationResult =
      await this.paginationService.paginateWithQueryBuilder(
        this.handleFilters(filters),
        {
          limit,
          page,
        },
      );

    if (!paginationResult.items.length) return paginationResult;

    const { items, meta } = paginationResult;

    const itemsWithVotes = await this.addVotedByCurrentUser(
      items,
      logged_in_user_id,
    );

    return {
      items: itemsWithVotes,
      meta,
    };
  }

  async getPoliticianById(id: string) {
    const politician = await this.createPoliticianQueryBuilder()
      .where('politician.id = :id', { id })
      .getOne();

    if (!politician) throw new NotFoundError('Not Valid');

    return politician;
  }

  async createPolitician(payload: CreatePoliticianPayload) {
    const item = Politician.create(payload);

    return politicianRepository.save(item);
  }

  async updateVotesAmount(politician: Politician, type: CountHandler) {
    if (politician.votes_amount === 0 && type === 'decrement')
      throw new BadRequestError('Cant decrement');

    politician.votes_amount += type === 'increment' ? 1 : -1;

    return politicianRepository.update(politician.id, {
      votes_amount: politician.votes_amount,
    });
  }

  async updatePolitician(id: string, payload: UpdatePoliticianPayload) {
    const politicianToUpdate = await this.getPoliticianById(id);

    const item = Politician.update(payload);

    return politicianRepository.update(politicianToUpdate.id, item);
  }

  async deletePolitician(id: string) {
    const politicianToDelete = await this.getPoliticianById(id);

    return politicianRepository.remove(politicianToDelete);
  }
}
