import { z } from 'zod';

export const mapInputSchema = z
  .object({
    systolic: z
      .coerce
      .number({
        invalid_type_error: 'Please enter a valid systolic blood pressure (70-250 mmHg).',
        required_error: 'Systolic blood pressure is required.',
      })
      .min(70, 'Please enter a valid systolic blood pressure (70-250 mmHg).')
      .max(250, 'Please enter a valid systolic blood pressure (70-250 mmHg).'),
    diastolic: z
      .coerce
      .number({
        invalid_type_error: 'Please enter a valid diastolic blood pressure (40-150 mmHg).',
        required_error: 'Diastolic blood pressure is required.',
      })
      .min(40, 'Please enter a valid diastolic blood pressure (40-150 mmHg).')
      .max(150, 'Please enter a valid diastolic blood pressure (40-150 mmHg).'),
  })
  .superRefine((values, ctx) => {
    if (values.systolic <= values.diastolic) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Systolic pressure must be greater than diastolic pressure.',
        path: ['systolic'],
      });
    }
  });

export type MapInput = z.infer<typeof mapInputSchema>;
export type MapValidationResult = ReturnType<typeof mapInputSchema.safeParse>;

export function validateMapInput(input: { systolic: string; diastolic: string }): MapValidationResult {
  return mapInputSchema.safeParse(input);
}
