import OrderListTable from '@/components/order/list-table.client'
import { OrderSearchForm } from '@/components/order/search-form.client'
import { Card, CardContent } from '@/components/ui/card'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Suspense } from 'react'


export default async function AdminOrderListPage() {
  const queryClient = new QueryClient()

  return (
    <>
      <h1 className="text-3xl font-bold my-4">Orders</h1>
      <Card className="w-full mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <OrderSearchForm />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense>
              <OrderListTable />
            </Suspense>
          </HydrationBoundary>
        </CardContent>
      </Card>
    </>
  )
}