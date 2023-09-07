import { ProtectedProcedureCtx } from '../../trpc'
import { CreateNewIncomeInputSchema, GetAllIncomesInputSchema } from './income.schema'

type CreateNewIncomeHandlerInputs = {
  ctx: ProtectedProcedureCtx
  input: CreateNewIncomeInputSchema
}
export const createNewIncomeHandler = async ({ ctx, input }: CreateNewIncomeHandlerInputs) => {
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
}

type GetAllIncomesHandlerInputs = {
  ctx: ProtectedProcedureCtx
  input: GetAllIncomesInputSchema
}

export const getAllIncomesHandler = ({ ctx, input }: GetAllIncomesHandlerInputs) => {
  // @Todo - implement pagination

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
}
