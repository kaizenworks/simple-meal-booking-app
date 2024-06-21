import OrderListTable from '@/components/order/list-table.client'
import { OrderSearchForm } from '@/components/order/search-form.client'
import { getShippingMethod } from '@/components/settings/shipping-method';
import { Card, CardContent } from '@/components/ui/card'
import db from '@/lib/db';
import Meal from '@/models/Meal';
import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';
import { Suspense } from 'react'

async function getMeals() {
  unstable_noStore();
  await db.connect();
  let docs = await Meal.find({})
  return docs.map(doc => doc.toJSON())
}

export const metadata: Metadata = {
  title: "Orders"
};

export default async function AdminOrderListPage() {


  const meals = await getMeals();

  const shippingMethods = await getShippingMethod();


  return (
    <>
      <h1 className="text-3xl font-bold my-4">Orders</h1>
      <Card className="w-full mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <Suspense>
            <OrderSearchForm meals={meals} shippingMethods={shippingMethods} />
            <OrderListTable />
          </Suspense>
        </CardContent>
      </Card>
    </>
  )
}
