import { z } from 'zod'

export const ZCreateNewInvestmentInputSchema = z.object({
  name: z.string(),
  date: z.date(),
  amount: z.string(),
  roi: z.string(),
  roiRecurrance: z.enum(['Monthly', 'Yearly']),
  addToExpenses: z.boolean(),
})
export type CreateNewInvestmentInputSchema = z.infer<typeof ZCreateNewInvestmentInputSchema>

export const ZGetAllInvestmentsInputSchema = z
  .object({
    filters: z
      .object({
        date: z
          .object({
            from: z.date().optional(),
            to: z.date().optional(),
          })
          .optional(),
      })
      .optional(),
  })
  .optional()

export type GetAllInvestmentsInputSchema = z.infer<typeof ZGetAllInvestmentsInputSchema>
