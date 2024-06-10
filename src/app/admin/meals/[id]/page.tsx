import MealForm from '@/components/meal/meal-form'
import { Card, CardContent } from '@/components/ui/card'
import Meal, { IMeal } from '@/models/Meal';
import { Metadata } from 'next'
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: "Edit Meal | Simple Meal Ordering App",
	description: "Simple Meal Ordering App Demo by Kaizenworks",
};

async function getMeal(id:string): Promise<IMeal | null> {
  return await Meal.findOne({_id:id});
}

export default async function EditMealPage({ params }: { params: { id: string } }) {

  let meal = await getMeal(params.id);

  if(!meal) return redirect('/admin/meals')
  
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold my-4">Edit Meal</h1>
      </div>
      <Card className="w-full md:w-50 mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <MealForm meal={meal} />
        </CardContent>
      </Card>
    </>
  )
}
