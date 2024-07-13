import { type ZodRawShape, z } from 'zod';

import {
  optionalOrderParamSchema,
  optionalPaginationParamSchema,
} from './zod.utils';

const pageSchema = optionalPaginationParamSchema.default(1);
const limitSchema = optionalPaginationParamSchema.default(10);

export function createPaginationSchema<T extends ZodRawShape>(fields?: T) {
  const paginationSchema = z.object({
    page: pageSchema,
    limit: limitSchema,
    order_by_created_at: optionalOrderParamSchema,
    order_by_updated_at: optionalOrderParamSchema,
    ...fields,
  });

  return paginationSchema;
}

export function createPaginationSchemaWithoutOrderBy<T extends ZodRawShape>(
  fields?: T
) {
  const paginationSchema = z.object({
    page: pageSchema,
    limit: limitSchema,
    ...fields,
  });

  return paginationSchema;
}

export const basePaginationItems = [
  {
    key: 'page',
    defaultValue: '1',
  },
  {
    key: 'limit',
    defaultValue: '10',
  },
] as const;
