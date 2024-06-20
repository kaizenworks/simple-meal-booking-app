"use server"
import { z } from 'zod';
import Meal, { IMeal } from "@/models/Meal";
import ShippingMethod, { IShippingMethod } from "@/models/ShippingMethod"
import Order from '@/models/Order';
import { revalidateTag, revalidatePath } from 'next/cache';
import { checkoutSchema } from '@/lib/zod/checkout';

export async function saveOrderAction(invoiceId: string, body: z.infer<typeof checkoutSchema>) {

	let meal: IMeal | null = await Meal.findOne({ _id: body.mealId });
	let shipping: IShippingMethod | null = await ShippingMethod.findOne({ _id: body.shippingId });

	if (!meal || !shipping) {
		return { error: "Invalid meal or shipping method." }
	}

	const cartTotal = body.quantity * meal.price * body.days.length;
	const shippingCharge = shipping.charge * body.days.length;
	const total = cartTotal + shippingCharge;

	let order = await Order.findOne({invoiceId});

	if (!order) {
		return { error: "No order found." }
	}

	Object.assign(
		order,
		body,
		{
			mealName: meal.name,
			mealPrice: meal.price
		},
		{
			shippingMethod: shipping.name,
			shippingRate: shipping.charge
		},
		{
			cartTotal,
			shippingCharge,
			total
		}
	);

	try {
		order = await order.save();
	} catch (error) {
		console.log(error);
		return { error: (error as any).message };
	}


	revalidateTag('order')
	revalidatePath('/admin')

}