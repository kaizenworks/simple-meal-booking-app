'use server'
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'
import Meal from "@/models/Meal";

export const deleteMealAction = async ({mealId}:{mealId:string}) => {
	
	await Meal.deleteOne({_id:mealId});
	
	revalidateTag('meals')
	revalidatePath('/admin/meals')

}
