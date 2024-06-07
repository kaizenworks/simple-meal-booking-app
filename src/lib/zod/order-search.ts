import { object, string } from "zod"
 
export const orderSearchSchema = object({
  query: string().optional(),
  status: string().optional(),
  mealId: string().optional(),
  shipping: string().optional()
})