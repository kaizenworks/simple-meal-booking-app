import db from "@/lib/db";
import { getInvoiceId } from "@/lib/invoice";
import { getShippingCharge } from "@/lib/shipping";
import Meal from "@/models/Meal";
import Order from "@/models/Order";

export async function POST(request: Request) {

  try {
    let body = await request.json();

    await db.connect();

    const meal = await Meal.findById(body.mealId);

    if (!meal) return Response.json({ message: "Meal not found" }, { status: 404 });

    let invocieId = await getInvoiceId();
    let order = new Order(Object.assign(
      Object.create({invocieId}),
      body,
      {
        mealName: meal.name,
        mealPrice: meal.price
      },
      {
        shipping: getShippingCharge(body.shippingMethod)
      }
    ))

    order.cartTotal = order.quantity * order.mealPrice;
    order.total = order.cartTotal + order.shipping;

    order = await order.save();

    return Response.json({ message: "Checkout successful.", data: order });

  } catch (error) {
    return Response.json({ message: (error as any).message }, { status: 500 });
  }

}
