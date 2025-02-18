import { z } from 'nestjs-zod/z';

import { createNullableTransform } from 'src/utils/create-nullable-transform.util';

/**
 * -----------------------------------------------------------------------------
 * Default Schemas
 * -----------------------------------------------------------------------------
 */
export const numberSchema = z.number().safe('Value is not safe');
export const stringSchema = z.string().trim();
export const emailStringSchema = stringSchema.email();
export const urlStringSchema = stringSchema.url();
export const uuidSchema = stringSchema.uuid();
export const orderParamSchema = z.enum(['ASC', 'DESC']);
export const genderStringSchema = z.enum(['M', 'F']);
export const integerNumberSchema = numberSchema.int();
export const floatNumberSchema = numberSchema.refine((val) => val % 1 !== 0, {
  message: 'Value must be float',
});

export const stringToNumberSchema = stringSchema
  .refine((value) => !Number.isNaN(+value))
  .transform(Number);

export const paginationParamSchema = z
  .union([stringSchema, integerNumberSchema])
  .refine((value) => !Number.isNaN(+value))
  .transform(Number);

export const booleanStringSchema = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

export const cpfStringSchema = stringSchema.regex(
  /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
);

export const phoneNumberStringSchema = stringSchema.regex(
  /^\(\d{2}\) \d{5}-\d{4}$/,
);

export const timeStringSchema = stringSchema.time({ precision: 3 });

export const datetimeStringSchema = stringSchema
  .datetime()
  .transform((value) => new Date(value));

export const dateStringSchema = stringSchema.date();

/**
 * -----------------------------------------------------------------------------
 * Optional Schemas
 * -----------------------------------------------------------------------------
 */
export const optionalEmailStringSchema =
  createNullableTransform(emailStringSchema);

export const optionalStringSchema = createNullableTransform(stringSchema);

export const optionalCpfStringSchema = createNullableTransform(cpfStringSchema);

export const optionalStringToNumberSchema =
  createNullableTransform(stringToNumberSchema);

export const optionalStringSchemaToLowerCase = optionalStringSchema.transform(
  (val) => val?.toLocaleLowerCase(),
);

export const optionalPhoneNumberStringSchema = createNullableTransform(
  phoneNumberStringSchema,
);

export const optionalUuidSchema = createNullableTransform(uuidSchema);

export const optionalUrlStringSchema = createNullableTransform(urlStringSchema);

export const optionalIntegerNumberSchema =
  createNullableTransform(integerNumberSchema);

export const optionalFloatNumberSchema =
  createNullableTransform(floatNumberSchema);

export const optionalPaginationParamSchema = createNullableTransform(
  paginationParamSchema,
);

export const optionalTimeStringSchema =
  createNullableTransform(timeStringSchema);

export const optionalDatetimeStringSchema =
  createNullableTransform(datetimeStringSchema);

export const optionalDateStringSchema =
  createNullableTransform(dateStringSchema);

export const optionalBooleanStringSchema =
  createNullableTransform(booleanStringSchema);

export const optionalOrderParamSchema =
  createNullableTransform(orderParamSchema);

export const optionalGenderStringSchema =
  createNullableTransform(genderStringSchema);
