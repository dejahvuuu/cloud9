import * as z from 'zod';
import { ZodSchema } from 'zod';

export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
  ): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);
  
      throw new Error(errors.join(', '));
    }
    return result.data;
}

export const propertySchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'name must be at least 2 characters.',
      })
      .max(100, {
        message: 'name must be less than 100 characters.',
      }),
    checkin: z
      .string()
      .min(2, {
        message: 'checkin must be at least 2 characters.',
      })
      .max(100, {
        message: 'checkin must be less than 100 characters.',
      }),
  });