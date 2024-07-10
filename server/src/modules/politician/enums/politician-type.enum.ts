import { z } from 'nestjs-zod/z';

import { createNullableTransform } from 'src/utils/create-nullable-transform.util';

export enum PoliticianType {
  GOVERNOR = 'governador',
  CONGRESSPERSON = 'deputado(a)',
  CITY_COUNCILOR = 'vereador(a)',
  PRESIDENT = 'presidente(a)',
  MAYOR = 'prefeito(a)',
}

export const politicianTypes = Object.values(PoliticianType);

export const politicianTypeSchema = z.nativeEnum(PoliticianType);

export const optionalPoliticianTypeSchema =
  createNullableTransform(politicianTypeSchema);
