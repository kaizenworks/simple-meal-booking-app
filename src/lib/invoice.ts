import Order from "@/models/Order";

export async function getInvoiceId() {

	const lastOrder = await Order.findOne({},{invoiceId:1}).sort({createdAt:-1});

	if( !lastOrder ) return `${process.env.INVOICE_PREFIX}-1`;

	let counter = lastOrder.invoiceId.split('-').pop();
	counter = parseInt(counter) +1;

	return `${process.env.INVOICE_PREFIX}-${counter}`;
	
}