'use server'
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'
import Meal from "@/models/Meal";
import { z } from 'zod';
import { mealFormSchema } from '@/components/meal/meal-form';

export async function saveMeal(mealId: string | null, mealObject: z.infer<typeof mealFormSchema>) {
	
	let meal;
	if(mealId) {
		meal = await Meal.findOne({_id:mealId});
		Object.assign(meal,mealObject);
	} else {
		meal = new Meal(mealObject);
	}

	try{
		await meal.save();

		
	} catch(error) {
		console.error(error);
		return {
			errors: "This form contains errors."
		}
	}

	revalidateTag('meals')
	revalidatePath('/admin/meals')
}