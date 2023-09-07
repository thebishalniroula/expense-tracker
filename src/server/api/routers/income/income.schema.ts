import { z } from 'zod'

export const ZCreateNewIncomeInputSchema = z.object({
  name: z.string(),
  date: z.date(),
  amount: z.string(),
  isRecurring: z.boolean(),
  // @Todo - Find a way to infer these types directly from db schema
  recurrance: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
})

export type CreateNewIncomeInputSchema = z.infer<typeof ZCreateNewIncomeInputSchema>

export const ZGetAllIncomesInputSchema = z
  .object({
    filters: z
      .object({
        date: z
          .object({
            from: z.date().optional(),
            to: z.date().optional(),
          })
          .optional(),
        recurrance: z.enum(['All', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
      })
      .optional(),
  })
  .optional()

export type GetAllIncomesInputSchema = z.infer<typeof ZGetAllIncomesInputSchema>
