import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const incomeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        amount: z.string(),
        isRecurring: z.boolean(),
        recurrance: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, date, amount, isRecurring, recurrance } = input
      const [income, user] = await ctx.prisma.$transaction([
        ctx.prisma.income.create({
          data: {
            name,
            userId: ctx.session.user.id,
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
            totlalSavings: {
              increment: parseInt(amount),
            },
          },
        }),
      ])
      return user
    }),
})
