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

export type Politician = {
  id: string;
  date_of_birth: string;
  corruption_scandals_amount: number;
  politician_photo_url: string;
  politician_name: string;
  political_ideology: PoliticianPoliticalIdeology;
  votes_amount: number;
  politician_type: PoliticianType;
};

export type PaginatePoliticiansResponse = iPaginationResponse<
  Politician & { voted_by_current_user: boolean }
>;

export const politicalIdeologySchema = z.nativeEnum(
  PoliticianPoliticalIdeology
);

export const optionalIdeologySchema = createNullableTransform(
  politicalIdeologySchema
);

export const politicianTypeSchema = z.nativeEnum(PoliticianType);

export const optionalPoliticianTypeSchema =
  createNullableTransform(politicianTypeSchema);

export const paginatePoliticiansParamsSchema =
  createPaginationSchemaWithoutOrderBy({
    politician_name: optionalStringSchemaToLowerCase,
    political_ideology: optionalIdeologySchema,
    order_by_date_of_birth: optionalOrderParamSchema,
    order_by_most_votes: optionalOrderParamSchema,
    politician_type: optionalPoliticianTypeSchema,
  });

export type PaginatePoliticiansParams = z.infer<
  typeof paginatePoliticiansParamsSchema
>;
