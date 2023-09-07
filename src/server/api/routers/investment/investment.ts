import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { ZCreateNewInvestmentInputSchema, ZGetAllInvestmentsInputSchema } from './investment.schema'
import { createNewInvestmentHandler, getAllInvestmentsHandler } from './investment.handler'
export const investmentRouter = createTRPCRouter({
  create: protectedProcedure.input(ZCreateNewInvestmentInputSchema).mutation(createNewInvestmentHandler),
  getAll: protectedProcedure.input(ZGetAllInvestmentsInputSchema).query(getAllInvestmentsHandler),
})
