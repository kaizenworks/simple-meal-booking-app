import MealForm from '@/components/meal/meal-form'
import { Card, CardContent } from '@/components/ui/card'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Add Meal",
};

export default async function AddMealPage() {
  
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold my-4">Add Meal</h1>
      </div>
      <Card className="w-full md:w-50 mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <MealForm />
        </CardContent>
      </Card>
    </>
  )
}
