import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { optionalUuidSchema } from 'src/shared/schemas.shared';
import { createPaginationSchema } from 'src/utils/create-pagination-schema.utils';

export const paginateVotesSchema = createPaginationSchema({
  voter_id: optionalUuidSchema,
  politician_id: optionalUuidSchema,
}).refine((data) => data.voter_id && data.politician_id, {
  message: 'Passe algum parametro',
});

export type PaginateVotesPayload = z.infer<typeof paginateVotesSchema>;

export class PaginateVotesDTO extends createZodDto(paginateVotesSchema) {
  @ApiPropertyOptional({ type: String, description: 'Optional voter id' })
  voter_id?: string;

  @ApiPropertyOptional({ type: String, description: 'Optional politician id' })
  politician_id?: string;
}
