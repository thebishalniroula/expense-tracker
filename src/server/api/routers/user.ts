import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import bcrypt from 'bcryptjs'
export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(input.password, salt)
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
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
