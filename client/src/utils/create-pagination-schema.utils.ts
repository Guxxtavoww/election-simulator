import { type ZodRawShape, z } from 'zod';

import {
  optionalOrderParamSchema,
  optionalPaginationParamSchema,
} from './zod.utils';

export function createPaginationSchema<T extends ZodRawShape>(fields?: T) {
  const paginationSchema = z.object({
    page: optionalPaginationParamSchema,
    limit: optionalPaginationParamSchema,
    order_by_created_at: optionalOrderParamSchema,
    order_by_updated_at: optionalOrderParamSchema,
    ...fields,
  });

  return paginationSchema;
}

export function createPaginationSchemaWithoutOrderBy<T extends ZodRawShape>(
  fields: T
) {
  const paginationSchema = z.object({
    page: optionalPaginationParamSchema.default(1),
    limit: optionalPaginationParamSchema.default(10),
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
  {
    key: 'order_by_created_at',
  },
  {
    key: 'order_by_updated_at',
  },
] as const;
