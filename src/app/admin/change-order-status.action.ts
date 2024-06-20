'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import Order from '@/models/Order';
import { orderStatusEditFormSchema } from '@/components/order/change-order-status-form';
import { z } from 'zod';

export const changeOrderStatusAction = async (invoiceId: string, {status}: z.infer<typeof orderStatusEditFormSchema>) => {
	
	let order = await Order.findOne({invoiceId});
	if(!order) return {error: "Order not found"};

	order.status = status;

	await order.save();

	revalidateTag('orders')
	revalidatePath('/admin')

}
