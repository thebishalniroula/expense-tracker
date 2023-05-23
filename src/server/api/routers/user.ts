import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(z.object({ email: z.string(), password: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.user.create({
      data: {
        email: input.email,
        password: input.password,
      },
    })
  }),
  me: protectedProcedure.query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        name: true,
        email: true,
        totalExpenses: true,
        totalIncome: true,
        totalInvestments: true,
      },
    })
  }),
})
