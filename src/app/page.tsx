"use client"

import { useQuery } from '@tanstack/react-query'
import OrderForm, { ICheckoutBody } from '@/components/order-form';
import { useState } from 'react';
import Navbar from '@/components/navbar';


export default function Home() {

  const { data } = useQuery({
    queryKey: ['meals'],
    queryFn: async function getMeals() {
      let response = await fetch('/api/meals');
      let json = await response.json();
      return json;
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ICheckoutBody) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json: any = await response.json();

      if (response.ok) {
        alert(json.message);
      } else {
        alert(json.message);
      }

    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
  }


  return (
    <>
      <Navbar />
      <div className="container py-5 mx-auto">
        <OrderForm meals={data?.data ?? []} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </>


  );
}
