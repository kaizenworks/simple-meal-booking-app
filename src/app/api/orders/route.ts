import db from "@/lib/db";
import { escapeRegex } from "@/lib/escape-regex";
import Order, { IOrder } from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  await db.connect();

  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  const status = searchParams.get('status')
  const mealId = searchParams.get('mealId')
  const shippingId = searchParams.get('shippingId')

  let dbQuery: any = {}
  if (query) {
    dbQuery['$or'] = [
      { 'invoiceId': new RegExp(escapeRegex(query), "i") },
      { 'name': new RegExp(escapeRegex(query), "i") },
      { 'phone': new RegExp(escapeRegex(query), "i") },
      { 'email': new RegExp(escapeRegex(query), "i") }
    ]
  }
  if (status) dbQuery['status'] = status;
  if (mealId) dbQuery['mealId'] = mealId;
  if (shippingId) dbQuery['shippingId'] = shippingId;

  let orders = await Order.find(dbQuery).sort({ _id: -1 });

  orders = orders.map((order: IOrder) => { return order.toJSON() })

  return NextResponse.json({ data: orders })
}
