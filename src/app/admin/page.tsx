import OrderListTable from '@/components/order/list-table.client'
import { OrderSearchForm } from '@/components/order/search-form.client'
import { Card, CardContent } from '@/components/ui/card'
import { Suspense } from 'react'


export default async function AdminOrderListPage() {

  return (
    <>
      <h1 className="text-3xl font-bold my-4">Orders</h1>
      <Card className="w-full mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <Suspense>
            <OrderSearchForm />
            <OrderListTable />
          </Suspense>
        </CardContent>
      </Card>
    </>
  )
}
