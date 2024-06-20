import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export interface IOrder {
  _id: string;
  invoiceId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  quantity: number;
  mealId?: string;
  mealName: string;
  mealPrice: number;
  shippingId?: string;
  shippingMethod: string;
  shippingRate: number;
  days: Date[];
  cartTotal: number;
  shippingCharge: number;
  total: number;
  status: string;
  trackingId: string;
  createdAt: Date;
  updatedAt: Date;

  toJSON: Function;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  invoiceId: { type: String, required: true, unique: true, lowercase:true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  note: String,
  quantity: { type: Number, required: true },
  mealId: { type: mongoose.Schema.Types.ObjectId },
  mealName: { type: String, required: true },
  mealPrice: { type: Number, required: true },
  shippingId: { type: mongoose.Schema.Types.ObjectId },
  shippingMethod: { type: String, required: true },
  shippingRate: { type: Number, required: true },
  days: [Date],
  cartTotal: { type: Number, required: true },
  shippingCharge: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
},{ timestamps: true });

OrderSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id.toString();
      ret.mealId = ret.mealId.toString();
      ret.shippingId = ret.shippingId.toString();
      delete ret._id;
      delete ret.__v;
  }
}); 

const Order = mongoose.models?.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

