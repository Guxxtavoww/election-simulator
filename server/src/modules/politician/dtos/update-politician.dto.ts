import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  optionalDateStringSchema,
  optionalIntegerNumberSchema,
  optionalStringSchema,
  optionalUrlStringSchema,
} from 'src/shared/schemas.shared';

import {
  PoliticianPoliticalIdeology,
  optionalIdeologySchema,
} from '../enums/politician-political-ideology.enum';
import {
  PoliticianType,
  optionalPoliticianTypeSchema,
} from '../enums/politician-type.enum';

export const updatePoliticianSchema = z.object({
  politician_name: optionalStringSchema,
  politician_photo_url: optionalUrlStringSchema,
  corruption_scandals_amount: optionalIntegerNumberSchema,
  political_ideology: optionalIdeologySchema,
  date_of_birth: optionalDateStringSchema,
  politician_type: optionalPoliticianTypeSchema,
});

export type UpdatePoliticianPayload = z.infer<typeof updatePoliticianSchema>;

export class UpdatePoliticianDTO extends createZodDto(updatePoliticianSchema) {
  @ApiPropertyOptional({
    description: 'Name of the politician',
    type: String,
    example: 'John Doe',
  })
  politician_name?: string;

  @ApiPropertyOptional({
    description: "URL of the politician's photo",
    type: String,
    example: 'https://example.com/photo.jpg',
  })
  politician_photo_url?: string;

  @ApiPropertyOptional({
    type: 'enum',
    enum: PoliticianPoliticalIdeology,
    example: PoliticianPoliticalIdeology.RIGHT,
  })
  political_ideology?: PoliticianPoliticalIdeology;

  @ApiPropertyOptional({
    type: 'enum',
    enum: PoliticianType,
    example: PoliticianType.CONGRESSPERSON,
  })
  politician_type?: PoliticianType;

  @ApiPropertyOptional({
    description: 'Number of corruption scandals the politician is involved in',
    type: Number,
    example: 5,
  })
  corruption_scandals_amount?: number;

  @ApiPropertyOptional({
    description: 'Date of birth of the politician',
    type: String,
    format: 'date',
    example: '1980-01-01',
  })
  date_of_birth?: string;
}
