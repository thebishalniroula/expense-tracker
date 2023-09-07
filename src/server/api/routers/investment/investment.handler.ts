import { ProtectedProcedureCtx } from '../../trpc'
import { CreateNewInvestmentInputSchema, GetAllInvestmentsInputSchema } from './investment.schema'

type CreateNewInvestmentHandlerInputs = {
  ctx: ProtectedProcedureCtx
  input: CreateNewInvestmentInputSchema
}
export const createNewInvestmentHandler = async ({ ctx, input }: CreateNewInvestmentHandlerInputs) => {
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
}

type GetAllInvestmentsHandlerInputs = {
  ctx: ProtectedProcedureCtx
  input: GetAllInvestmentsInputSchema
}

export const getAllInvestmentsHandler = ({ ctx, input }: GetAllInvestmentsHandlerInputs) => {
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
}
