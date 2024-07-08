import { z } from 'zod';
import { cache } from 'react';

import { urlStringSchema } from '@/utils/zod.utils';

export const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: urlStringSchema,
});

export type ENV = z.infer<typeof envSchema>;

export const parseEnv = cache(async () => {
  const env = await envSchema.parseAsync(process.env);

  return env;
});
