import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UuidParam } from 'src/shared/decorators/uuid-param.decorator';
import { DecodedToken } from 'src/shared/decorators/decoded-token.decorator';
import { ApiPaginationQuery } from 'src/shared/decorators/api-pagination-query.decorator';
import { DataBaseInterceptorDecorator } from 'src/shared/decorators/database-interceptor.decorator';

import { politicianTypes } from '../enums/politician-type.enum';
import { PoliticianService } from '../services/politician.service';
import { CreatePoliticianDTO } from '../dtos/create-politician.dto';
import { UpdatePoliticianDTO } from '../dtos/update-politician.dto';
import { PaginatePoliticiansDTO } from '../dtos/paginate-politicians.dto';
import { political_ideologies } from '../enums/politician-political-ideology.enum';

@ApiTags('politician')
@Controller('politician')
export class PoliticianController {
  constructor(private readonly politicianService: PoliticianService) {}

  @Get('paginate')
  @ApiPaginationQuery([], true)
  paginate(
    @Query() querys: PaginatePoliticiansDTO,
    @DecodedToken() decoded_token: DecodedTokenType,
  ) {
    return this.politicianService.paginatePoliticians(querys, decoded_token.id);
  }

  @Get('political-ideologies')
  getIdeologies() {
    return political_ideologies;
  }

  @Get('politician-types')
  get() {
    return politicianTypes;
  }

  @Get(':id')
  getOne(@UuidParam('id') id: string) {
    return this.politicianService.getPoliticianById(id);
  }

  @Post()
  @DataBaseInterceptorDecorator()
  create(@Body() payload: CreatePoliticianDTO) {
    return this.politicianService.createPolitician(payload);
  }

  @Put(':id')
  @DataBaseInterceptorDecorator()
  update(@UuidParam('id') id: string, @Body() payload: UpdatePoliticianDTO) {
    return this.politicianService.updatePolitician(id, payload);
  }

  @Delete(':id')
  delete(@UuidParam('id') id: string) {
    return this.politicianService.deletePolitician(id);
  }
}
