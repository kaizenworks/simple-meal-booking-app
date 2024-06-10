'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import ShippingMethod from '@/models/ShippingMethod';

export const deleteShippingAction = async ({id}:{id:string}) => {
	
	await ShippingMethod.deleteOne({_id:id});
	
	revalidateTag('shipping')
	revalidatePath('/admin/settings')

}
