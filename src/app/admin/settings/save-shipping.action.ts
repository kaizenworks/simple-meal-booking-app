'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import ShippingMethod from '@/models/ShippingMethod';

export async function saveShipping(shippingId: string | null, formData: FormData) {
	
	let shippingObject = {
		name: formData.get('name'),
		charge: parseFloat( '' + formData.get('charge') )
	}

	let shipping;
	if(shippingId) {
		shipping = await ShippingMethod.findOne({_id:shippingId});
		Object.assign(shipping,shippingObject);
	} else {
		shipping = new ShippingMethod(shippingObject);
	}

	try{
		await shipping.save();
	} catch(error) {
		console.error(error);
		return {
			errors: "This form contains errors."
		}
	}

	revalidateTag('shipping')
	revalidatePath('/admin/settings')
}