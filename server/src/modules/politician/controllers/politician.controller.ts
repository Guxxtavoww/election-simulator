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
import { ApiPaginationQuery } from 'src/shared/decorators/api-pagination-query.decorator';

import { PoliticianService } from '../services/politician.service';
import { CreatePoliticianDTO } from '../dtos/create-politician.dto';
import { UpdatePoliticianDTO } from '../dtos/update-politician.dto';
import { PaginatePoliticiansDTO } from '../dtos/paginate-politicians.dto';

@ApiTags('politician')
@Controller('politician')
export class PoliticianController {
  constructor(private readonly politicianService: PoliticianService) {}

  @Get('paginate')
  @ApiPaginationQuery([], true)
  paginate(@Query() querys: PaginatePoliticiansDTO) {
    return this.politicianService.paginatePoliticians(querys);
  }

  @Get(':id')
  getOne(@UuidParam('id') id: string) {
    return this.politicianService.getPoliticianById(id);
  }

  @Post()
  create(@Body() payload: CreatePoliticianDTO) {
    return this.politicianService.createPolitician(payload);
  }

  @Put(':id')
  update(@UuidParam('id') id: string, @Body() payload: UpdatePoliticianDTO) {
    return this.politicianService.updatePolitician(id, payload);
  }

  @Delete(':id')
  delete(@UuidParam('id') id: string) {
    return this.politicianService.deletePolitician(id);
  }
}
