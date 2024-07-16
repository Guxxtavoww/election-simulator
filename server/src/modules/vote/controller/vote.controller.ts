import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UuidParam } from 'src/shared/decorators/uuid-param.decorator';
import { DecodedToken } from 'src/shared/decorators/decoded-token.decorator';

import { VoteService } from '../services/vote.service';
import { PaginateVotesDTO } from '../dtos/paginate-votes.dto';

@ApiTags('vote')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get('paginate')
  paginate(@Query() querys: PaginateVotesDTO) {
    return this.voteService.paginateVotes(querys);
  }

  @Post(':politician_id')
  vote(
    @UuidParam('politician_id') politician_id: string,
    @DecodedToken() decoded_token: DecodedTokenType,
  ) {
    return this.voteService.vote(decoded_token.id, politician_id);
  }

  @Delete(':politician_id')
  deleteVote(
    @UuidParam('politician_id') politician_id: string,
    @DecodedToken() decoded_token: DecodedTokenType,
  ) {
    return this.voteService.deleteVote(politician_id, decoded_token.id);
  }
}
