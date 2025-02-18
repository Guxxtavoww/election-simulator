import { z } from 'zod';

import {
  stringSchema,
  cpfStringSchema,
  emailStringSchema,
  dateSchema,
  optionalPhoneNumberStringSchema,
} from '@/utils/zod.utils';

export const registerSchema = z
  .object({
    user_email: emailStringSchema,
    password: stringSchema,
    confirmed_password: stringSchema,
    user_name: stringSchema,
    phone_number: optionalPhoneNumberStringSchema,
    user_cpf_number: cpfStringSchema,
    date_of_birth: dateSchema,
  })
  .refine((data) => data.password === data.confirmed_password, {
    message: 'Senhas não são iguais',
    path: ['confirmed_password'],
  });

export type RegisterPayload = z.infer<typeof registerSchema>;
