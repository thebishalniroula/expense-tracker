import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const investmentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), date: z.date(), amount: z.string(), roi: z.string() }))
    .mutation(({ ctx, input }) => {
      const { name, date, amount, roi } = input
      return ctx.prisma.investment.create({
        data: {
          name,
          userId: ctx.session.user.id,
          amount,
          date,
          roi,
        },
      })
    }),
})
