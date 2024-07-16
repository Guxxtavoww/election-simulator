/* eslint-disable no-unused-vars */
import { z } from 'zod';

import {
  createNullableTransform,
  optionalOrderParamSchema,
  optionalStringSchemaToLowerCase,
} from '@/utils/zod.utils';
import { createPaginationSchemaWithoutOrderBy } from '@/utils/create-pagination-schema.utils';

export enum PoliticianPoliticalIdeology {
  LEFT = 'Esquerda',
  FAR_LEFT = 'Extrema Esquerda',
  RIGHT = 'Direita',
  FAR_RIGHT = 'Extrema Direita',
}

export enum PoliticianType {
  GOVERNOR = 'governador',
  CONGRESSPERSON = 'deputado(a)',
  CITY_COUNCILOR = 'vereador(a)',
  PRESIDENT = 'presidente(a)',
  MAYOR = 'prefeito(a)',
}

export type PoliticianEntity = {
  id: string;
  date_of_birth: string;
  corruption_scandals_amount: number;
  politician_photo_url: string;
  politician_name: string;
  political_ideology: PoliticianPoliticalIdeology;
  votes_amount: number;
  politician_type: PoliticianType;
};

export interface Politician extends PoliticianEntity {
  voted_by_current_user: boolean;
}

export type PaginatePoliticiansResponse = PaginationResponse<Politician>;

export const politicalIdeologySchema = z.nativeEnum(
  PoliticianPoliticalIdeology
);

export const optionalIdeologySchema = createNullableTransform(
  politicalIdeologySchema
);

export const politicianTypeSchema = z.nativeEnum(PoliticianType);

export const optionalPoliticianTypeSchema =
  createNullableTransform(politicianTypeSchema);

const base_fields = {
  politician_name: optionalStringSchemaToLowerCase,
  political_ideology: optionalIdeologySchema,
  order_by_date_of_birth: optionalOrderParamSchema,
  order_by_most_votes: optionalOrderParamSchema.default('DESC'),
  politician_type: optionalPoliticianTypeSchema,
} as const;

export const paginatePoliticiansParamsSchema =
  createPaginationSchemaWithoutOrderBy(base_fields);

export type PaginatePoliticiansParams = z.infer<
  typeof paginatePoliticiansParamsSchema
>;

export const listPoliticiansParamsSchema = z.object(base_fields);

export type ListPoliticiansParams = z.infer<typeof listPoliticiansParamsSchema>;
