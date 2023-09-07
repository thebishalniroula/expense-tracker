import { ProtectedProcedureCtx } from '../../trpc'
import { CreateNewExpenseInputSchema, GetAllExpensesInputSchema } from './expense.schema'

type CreateNewExpenseHandlerInputs = {
  ctx: ProtectedProcedureCtx
  input: CreateNewExpenseInputSchema
}

export const createNewExpenseHandler = async ({ ctx, input }: CreateNewExpenseHandlerInputs) => {
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
}

type GetAllExpenseHandlerInputs = {
  ctx: ProtectedProcedureCtx
  input: GetAllExpensesInputSchema
}

export const getAllExpensesHandler = ({ ctx, input }: GetAllExpenseHandlerInputs) => {
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
}
