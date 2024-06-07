import { object, string } from "zod"
 
export const mealSearchSchema = object({
  query: string().optional()
})