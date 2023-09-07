import { z } from 'zod'

export const ZCreateNewExpenseInputSchema = z.object({
  name: z.string(),
  // @Todo - Find a way to infer these types directly from db schema
  category: z.enum(['Health', 'Education', 'Entertainment', 'Travel', 'Food', 'Other']),
  date: z.date(),
  amount: z.string(),
  isRecurring: z.boolean(),
  recurrance: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
})

export type CreateNewExpenseInputSchema = z.infer<typeof ZCreateNewExpenseInputSchema>

export const ZGetAllExpensesInputSchema = z
  .object({
    filters: z
      .object({
        date: z
          .object({
            from: z.date().optional(),
            to: z.date().optional(),
          })
          .optional(),
        recurrance: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
        category: z.enum(['Education', 'Health', 'Entertainment', 'Food', 'Travel', 'Other']).optional(),
      })
      .optional(),
  })
  .optional()

export type GetAllExpensesInputSchema = z.infer<typeof ZGetAllExpensesInputSchema>
