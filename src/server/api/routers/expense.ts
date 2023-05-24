import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const expenseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        // @Todo - Find a way to infer these types directly from db schema
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
              recurrance: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']).optional().nullable(),
              category: z.enum(['Education', 'Health', 'Entertainment', 'Food', 'Travel', 'Other']).optional(),
            })
            .optional(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      // @Todo - implement pagination
      return ctx.prisma.expense.findMany({
        where: {
          userId: ctx.session.user.id,
          date: {
            gte: input?.filters?.date?.from,
            lte: input?.filters?.date?.to,
          },
          recurrance: input?.filters?.recurrance,
          category: input?.filters?.category,
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
          category: true,
        },
      })
    }),
})
