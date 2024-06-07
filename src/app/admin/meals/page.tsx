import MealListTable from '@/components/meal/list-table.client'
import { MealSearchForm } from '@/components/meal/search-form.client'
import { Card, CardContent } from '@/components/ui/card'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Suspense } from 'react'


export default async function AdminMealListPage() {
  const queryClient = new QueryClient()

  return (
    <>
      <h1 className="text-3xl font-bold my-4">Meals</h1>
      <Card className="w-full mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <MealSearchForm />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense>
              <MealListTable />
            </Suspense>
          </HydrationBoundary>
        </CardContent>
      </Card>
    </>
  )
}
