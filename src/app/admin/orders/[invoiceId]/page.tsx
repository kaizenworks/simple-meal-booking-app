import AdminOrderForm from '@/components/order/admin-order-form';
import { getShippingMethod } from '@/components/settings/shipping-method';
import { Card, CardContent } from '@/components/ui/card'
import db from '@/lib/db';
import Meal from '@/models/Meal';
import Order, { IOrder } from '@/models/Order';
import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';

async function getOrder(invoiceId:string): Promise<IOrder | null> {
  await db.connect();
  let order = await Order.findOne({invoiceId});
  return order.toJSON();
}

async function getMeals() {
  unstable_noStore();
  await db.connect();
  let docs = await Meal.find({})
  return docs.map(doc => doc.toJSON())
}

export const metadata: Metadata = {
  title: "Edit Order"
};


export default async function EditMealPage({ params }: { params: { invoiceId: string } }) {

  let order = await getOrder(params.invoiceId);

  if(!order) return redirect('/admin')

  const meals = await getMeals();

  const shippingMethods = await getShippingMethod();

  
  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold my-4">Edit {order.invoiceId.toUpperCase()}</h1>
      </div>
      <Card className="w-full md:w-50 mx-auto">
        <CardContent className="flex flex-col gap-4 pt-6">
          <AdminOrderForm order={order} meals={meals} shippingMethods={shippingMethods} />
        </CardContent>
      </Card>
    </>
  )
}
