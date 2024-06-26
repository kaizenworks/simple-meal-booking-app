import MealListTable from '@/components/meal/list-table.client'
import { MealSearchForm } from '@/components/meal/search-form.client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Meals"
};

export default async function AdminMealListPage() {

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold my-4">Meals</h1>
        <Button asChild size="sm">
          <Link href="/admin/meals/add">Add Meal</Link>
        </Button>
      </div>
      <Card className="w-full mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <Suspense>

            <MealSearchForm />
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            <MealListTable />
          </Suspense>
          {/* </HydrationBoundary> */}
        </CardContent>
      </Card>
    </>
  )
}
