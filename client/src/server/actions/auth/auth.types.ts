import { z } from 'zod';

import {
  uuidSchema,
  stringSchema,
  cpfStringSchema,
  emailStringSchema,
  datetimeStringSchema,
  optionalDatetimeStringSchema,
  optionalPhoneNumberStringSchema,
} from '@/utils/zod.utils';

export const userSchema = z.object({
  id: uuidSchema,
  user_name: stringSchema,
  user_email: emailStringSchema,
  user_cpf_number: cpfStringSchema,
  created_at: datetimeStringSchema,
  updated_at: optionalDatetimeStringSchema,
  phone_number: optionalPhoneNumberStringSchema,
});

export const loginAndRegisterResponseSchema = z.object({
  user: userSchema,
  access_token: stringSchema,
});

export type LoginAndRegisterResponsePayload = z.infer<
  typeof loginAndRegisterResponseSchema
>;

export type UserType = z.infer<typeof userSchema>;
