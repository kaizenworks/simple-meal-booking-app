import Order from "@/models/Order";

export async function generateInvoiceId() {
	
	let order = await Order.findOne({}).sort({_id:-1});
	
	if(!order) return 'ORDER-00001';

	let orderNumber = parseInt(order.invoiceId.split('-')[1])
	orderNumber++;
	
	return 'ORDER-'+orderNumber.toString().padStart(5, '0');

}