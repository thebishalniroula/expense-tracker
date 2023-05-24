import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const investmentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        amount: z.string(),
        roi: z.string(),
        roiRecurrance: z.enum(['Monthly', 'Yearly']),
        addToExpenses: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, date, amount, roi, roiRecurrance, addToExpenses } = input
      const [investment, user] = await ctx.prisma.$transaction([
        ctx.prisma.investment.create({
          data: {
            name,
            userId: ctx.session.user.id,
            amount,
            date,
            roi,
            roiRecurrance,
          },
        }),
        ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            totalInvestments: {
              increment: parseInt(amount),
            },
            totalExpenses: {
              increment: addToExpenses ? parseInt(amount) : 0,
            },
          },
        }),
      ])
      return investment
    }),

  getAll: protectedProcedure
    .input(
      z
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
    )
    .query(({ ctx, input }) => {
      // @Todo - implement pagination

      return ctx.prisma.investment.findMany({
        where: {
          userId: ctx.session.user.id,
          date: {
            gte: input?.filters?.date?.from,
            lte: input?.filters?.date?.to,
          },
        },
        orderBy: {
          date: 'desc',
        },
        select: {
          id: true,
          name: true,
          amount: true,
          date: true,
          roi: true,
          roiRecurrance: true,
        },
      })
    }),
})
