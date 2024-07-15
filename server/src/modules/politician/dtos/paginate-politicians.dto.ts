import { z } from 'nestjs-zod/z';

import { createPaginationSchemaWithoutOrderBy } from 'src/utils/create-pagination-schema.utils';

import { fields, ListPoliticiansDTO } from './list-politicians.dto';

export const paginatePoliticiansSchema =
  createPaginationSchemaWithoutOrderBy(fields);

export type PaginatePoliticiansType = z.infer<typeof paginatePoliticiansSchema>;

export class PaginatePoliticiansDTO extends ListPoliticiansDTO {
  readonly page: number;
  readonly limit: number;
}
