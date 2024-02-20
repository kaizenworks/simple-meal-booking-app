"use client"

import { useQuery } from '@tanstack/react-query'
import OrderForm, { ICheckoutBody } from '@/components/order-form';


export default function Home() {

  const { data } = useQuery({
    queryKey: ['meals'],
    queryFn: async function getMeals() {
      let response = await fetch('/api/meals');
      let json = await response.json();
      return json;
    }
  })

  const handleSubmit = async (data: ICheckoutBody) => {
    console.error('TODO Implement handleSubmit', data)
  }


  return (
    <OrderForm meals={data?.data ?? []} onSubmit={handleSubmit} />
  );
}
