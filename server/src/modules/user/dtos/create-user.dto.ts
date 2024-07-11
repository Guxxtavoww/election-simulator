import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  stringSchema,
  emailStringSchema,
  cpfStringSchema,
  dateStringSchema,
  optionalPhoneNumberStringSchema,
} from 'src/shared/schemas.shared';

export const createUserSchema = z.object({
  user_name: stringSchema,
  user_email: emailStringSchema,
  password: stringSchema,
  phone_number: optionalPhoneNumberStringSchema,
  user_cpf_number: cpfStringSchema,
  date_of_birth: dateStringSchema,
});

export type CreateUserPayload = z.infer<typeof createUserSchema>;

export class CreateUserDTO extends createZodDto(createUserSchema) {
  @ApiProperty({ type: String, description: 'User name' })
  user_name: string;

  @ApiProperty({ type: String, description: 'User email' })
  user_email: string;

  @ApiPropertyOptional({ type: String, description: 'Optional password' })
  password: string;

  @ApiPropertyOptional({ type: String, example: '+919367788755' })
  phone_number?: string;

  @ApiProperty({ type: String, example: '123.456.789-00' })
  user_cpf_number: string;

  @ApiProperty({ type: String, example: '2003-12-09' })
  date_of_birth: string;
}
