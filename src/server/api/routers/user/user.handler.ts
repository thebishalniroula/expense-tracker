import bcrypt from 'bcryptjs'
import { ProtectedProcedureCtx, PublicProcedureCtx } from '../../trpc'
import { CreateNewUserInputSchema } from './user.schema'

type CreateNewUserHandlerInputs = {
  ctx: PublicProcedureCtx
  input: CreateNewUserInputSchema
}

export const createNewUserHandler = async ({ ctx, input }: CreateNewUserHandlerInputs) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(input.password, salt)
  return ctx.prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
    },
  })
}

type GetCurrentUserHandlerInputs = {
  ctx: ProtectedProcedureCtx
}

export const getCurrentUserHandler = ({ ctx }: GetCurrentUserHandlerInputs) => {
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
}
