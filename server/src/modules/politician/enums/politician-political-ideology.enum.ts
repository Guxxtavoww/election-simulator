import { z } from 'nestjs-zod/z';

import { createNullableTransform } from 'src/utils/create-nullable-transform.util';

export enum PoliticianPoliticalIdeology {
  LEFT = 'Esquerda',
  FAR_LEFT = 'Extrema Esquerda',
  RIGHT = 'Direita',
  FAR_RIGHT = 'Extrema Direita',
}

export const political_ideologies = Object.values(PoliticianPoliticalIdeology);

export const politicalIdeologySchema = z.nativeEnum(
  PoliticianPoliticalIdeology,
);

export const optionalIdeologySchema = createNullableTransform(
  politicalIdeologySchema,
);
