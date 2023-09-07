import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'
import { ZCreateNewUserInputSchema } from './user.schema'
import { createNewUserHandler, getCurrentUserHandler } from './user.handler'

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(ZCreateNewUserInputSchema).mutation(createNewUserHandler),
  me: protectedProcedure.query(getCurrentUserHandler),
})
