import { object, string } from "zod"
 
export const userSearchSchema = object({
  query: string().optional()
})