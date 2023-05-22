import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        category: z.enum(['Health', 'Education', 'Entertainment', 'Travel', 'Food', 'Other']),
        date: z.date(),
        amount: z.string(),
        isRecurring: z.boolean(),
        recurrance: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, category, date, amount, isRecurring, recurrance } = input
      const [expense, user] = await ctx.prisma.$transaction([
        ctx.prisma.expense.create({
          data: {
            userId: ctx.session.user.id,
            name,
            category,
            amount,
            date,
            isRecurring,
            recurrance,
          },
        }),
        ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            totalExpenses: {
              increment: parseInt(amount),
            },
          },
        }),
      ])
      return expense
    }),
})
