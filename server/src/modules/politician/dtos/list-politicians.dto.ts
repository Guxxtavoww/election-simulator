import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  optionalOrderParamSchema,
  optionalStringSchemaToLowerCase,
} from 'src/shared/schemas.shared';
import { OrderByEnum } from 'src/shared/enums.shared';

import {
  optionalIdeologySchema,
  PoliticianPoliticalIdeology,
} from '../enums/politician-political-ideology.enum';
import {
  PoliticianType,
  optionalPoliticianTypeSchema,
} from '../enums/politician-type.enum';

export const listPoliticiansSchema = z.object({
  politician_name: optionalStringSchemaToLowerCase,
  political_ideology: optionalIdeologySchema,
  order_by_date_of_birth: optionalOrderParamSchema,
  order_by_most_votes: optionalOrderParamSchema,
  politician_type: optionalPoliticianTypeSchema,
});

export type ListPoliticiansType = z.infer<typeof listPoliticiansSchema>;

export class ListPoliticiansDTO extends createZodDto(
  listPoliticiansSchema,
) {
  @ApiPropertyOptional({
    description: 'Name of the politician',
    type: String,
    example: 'John Doe',
  })
  politician_name?: string;

  @ApiPropertyOptional({
    type: 'enum',
    enum: PoliticianPoliticalIdeology,
    example: PoliticianPoliticalIdeology.RIGHT,
  })
  political_ideology?: PoliticianPoliticalIdeology;

  @ApiPropertyOptional({
    type: 'enum',
    enum: PoliticianType,
  })
  politician_type?: PoliticianType;

  @ApiPropertyOptional({
    type: 'enum',
    enum: OrderByEnum,
    example: OrderByEnum.DESC,
  })
  order_by_date_of_birth?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    type: 'enum',
    enum: OrderByEnum,
    example: OrderByEnum.DESC,
  })
  order_by_most_votes?: 'ASC' | 'DESC';
}
