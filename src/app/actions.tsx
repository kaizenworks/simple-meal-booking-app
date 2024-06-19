"use server"
import { z } from 'zod';
import Meal from "@/models/Meal";
import ShippingMethod from "@/models/ShippingMethod"
import Order from '@/models/Order';
import { generateInvoiceId } from '@/lib/generate-invoice-id';
import { revalidateTag, revalidatePath } from 'next/cache';
import { checkoutSchema } from '@/lib/zod/checkout';

function generateHash() {
	const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let hash = '';
	for (let i = 0; i < 16; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		hash += charset[randomIndex];
	}
	return hash;
}


export async function checkoutAction(body: z.infer<typeof checkoutSchema>) {

	let meal = await Meal.findOne({ _id: body.mealId });
	let shipping = await ShippingMethod.findOne({ _id: body.shippingId });

	if (!meal || !shipping) {
		return { error: "Invalid meal or shipping method." }
	}

	const invoiceId = await generateInvoiceId();

	const cartTotal = body.quantity * meal.price * body.days.length;
	const shippingCharge = shipping.charge * body.days.length;
	const total = cartTotal + shippingCharge;

	const hash = generateHash();

	let order = new Order({
		invoiceId,
		name: body.name,
		phone: body.phone,
		email: body.email,
		address: body.address,
		note: body.note,
		quantity: body.quantity,
		mealId: meal.id,
		mealName: meal.name,
		mealPrice: meal.price,
		shippingId: shipping.id,
		shippingMethod: shipping.name,
		shippingRate: shipping.charge,
		days: body.days,
		cartTotal,
		shippingCharge,
		total,
		trackingId: hash
	})

	try {
		order = await order.save();
	} catch (error) {
		console.log(error);
		return { error: (error as any).message };
	}


	revalidateTag('order')
	revalidatePath('/admin/orders')

	return order.toJSON();

}