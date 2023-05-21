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
})
