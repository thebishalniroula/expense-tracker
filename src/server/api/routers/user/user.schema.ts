import { z } from 'zod'

export const ZCreateNewUserInputSchema = z.object({ email: z.string(), password: z.string() })
export type CreateNewUserInputSchema = z.infer<typeof ZCreateNewUserInputSchema>
