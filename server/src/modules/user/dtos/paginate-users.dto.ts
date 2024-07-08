import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { optionalStringSchema } from 'src/shared/schemas.shared';
import { createPaginationSchema } from 'src/utils/create-pagination-schema.util';

export const paginateUsersSchema = createPaginationSchema({
  user_name: optionalStringSchema,
});

export type PaginateUsersPayload = z.infer<typeof paginateUsersSchema>;

export class PaginateUsersDTO extends createZodDto(paginateUsersSchema) {
  @ApiPropertyOptional({ type: String, description: 'Optional user name' })
  user_name?: string;
}
