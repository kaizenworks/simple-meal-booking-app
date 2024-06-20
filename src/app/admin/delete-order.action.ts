'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import Order from '@/models/Order';

export const deleteOrderAction = async ({invoiceId}:{invoiceId:string}) => {
	
	await Order.deleteOne({invoiceId});
	
	revalidateTag('orders')
	revalidatePath('/admin/')

}
