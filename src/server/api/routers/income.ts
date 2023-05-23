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
        // @Todo - Find a way to infer these types directly from db schema
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
            totalIncome: {
              increment: parseInt(amount),
            },
          },
        }),
      ])
      return user
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
              recurrance: z.enum(['All', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
            })
            .optional(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      // @Todo - implement pagination
      console.log(input?.filters?.recurrance)

      return ctx.prisma.income.findMany({
        where: {
          userId: ctx.session.user.id,
          date: {
            gte: input?.filters?.date?.from,
            lte: input?.filters?.date?.to,
          },
          recurrance: input?.filters?.recurrance === 'All' ? undefined : input?.filters?.recurrance,
        },
        orderBy: {
          date: 'desc',
        },
        select: {
          id: true,
          name: true,
          amount: true,
          date: true,
          recurrance: true,
        },
      })
    }),
})
