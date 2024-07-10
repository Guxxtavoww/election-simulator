import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  dateStringSchema,
  optionalIntegerNumberSchema,
  stringSchema,
  urlStringSchema,
} from 'src/shared/schemas.shared';

import {
  politicalIdeologySchema,
  PoliticianPoliticalIdeology,
} from '../enums/politician-political-ideology.enum';
import {
  PoliticianType,
  politicianTypeSchema,
} from '../enums/politician-type.enum';

export const createPoliticianSchema = z.object({
  politician_name: stringSchema,
  politician_photo_url: urlStringSchema,
  corruption_scandals_amount: optionalIntegerNumberSchema,
  political_ideology: politicalIdeologySchema,
  date_of_birth: dateStringSchema,
  politician_type: politicianTypeSchema,
});

export type CreatePoliticianPayload = z.infer<typeof createPoliticianSchema>;

export class CreatePoliticianDTO extends createZodDto(createPoliticianSchema) {
  @ApiProperty({
    description: 'Name of the politician',
    type: String,
    example: 'John Doe',
  })
  politician_name: string;

  @ApiProperty({
    description: "URL of the politician's photo",
    type: String,
    example: 'https://example.com/photo.jpg',
  })
  politician_photo_url: string;

  @ApiProperty({
    type: 'enum',
    enum: PoliticianPoliticalIdeology,
    example: PoliticianPoliticalIdeology.RIGHT,
  })
  political_ideology: PoliticianPoliticalIdeology;

  @ApiProperty({
    type: 'enum',
    enum: PoliticianType,
    example: PoliticianType.CONGRESSPERSON,
  })
  politician_type: PoliticianType;

  @ApiPropertyOptional({
    description: 'Number of corruption scandals the politician is involved in',
    type: Number,
    example: 5,
  })
  corruption_scandals_amount?: number;

  @ApiProperty({
    description: 'Date of birth of the politician',
    type: String,
    format: 'date',
    example: '1980-01-01',
  })
  date_of_birth: Date;
}
