import OrderForm, { ICheckoutBody } from '@/components/order-form';
import Navbar from '@/components/navbar';
import { getShippingMethod } from '@/components/settings/shipping-method';
import { unstable_noStore } from 'next/cache';
import Meal from '@/models/Meal';
import db from '@/lib/db';

async function getMeals() {
  unstable_noStore();
  await db.connect();
  let docs = await Meal.find({})
  return docs.map(doc => doc.toJSON())
}

export default async function Home() {

  const meals = await getMeals();

  const shippingMethods = await getShippingMethod();

  return (
    <>
      <Navbar />
      <div className="container py-5 mx-auto">
        {meals && shippingMethods && <OrderForm meals={meals} shippingMethods={shippingMethods} />}
      </div>
    </>


  );
}
