import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export interface IOrder {
  _id: string;
  invoiceId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  shippingMethod: string;
  days: Date[];
  note: string;
  mealId: ObjectId;
  mealName: string;
  mealPrice: number;
  quantity: number;
  cartTotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  invoiceId: { type: String, required: true, unique: true, lowercase:true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  shippingMethod: { type: String, required: true },
  days: [Date],
  note: String,
  mealId: { type: mongoose.Schema.Types.ObjectId, required: true },
  mealName: { type: String, required: true },
  mealPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  cartTotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
},{ timestamps: true });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

