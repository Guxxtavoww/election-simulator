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

export type UserType = z.infer<typeof userSchema>;

export interface LoginAndRegisterResponse {
  user: UserType;
  access_token: string
}
