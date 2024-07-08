import { z } from 'zod';

import {
  uuidSchema,
  stringSchema,
  emailStringSchema,
  optionalStringSchema,
} from '@/utils/zod.utils';

export const userSchema = z.object({
  id: uuidSchema,
  user_name: stringSchema,
  user_email: emailStringSchema,
  is_email_verified: z.boolean(),
  created_at: stringSchema,
  updated_at: optionalStringSchema,
});

export const loginAndRegisterResponseSchema = z.object({
  user: userSchema,
  access_token: stringSchema,
});

export type LoginAndRegisterResponsePayload = z.infer<
  typeof loginAndRegisterResponseSchema
>;

export type UserType = z.infer<typeof userSchema>;
