import mongoose from 'mongoose';

export interface IShippingMethod {
  id: string;
  name: string;
  charge: number;
  createdAt: Date,
  updatedAt: Date

  toJSON: Function
}

const ShippingMethodSchema = new mongoose.Schema<IShippingMethod>({
  name: { type: String, required: true },
  charge: { type: Number, required: true }
},{ timestamps: true });

ShippingMethodSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
  }
}); 


const ShippingMethod = mongoose.models?.ShippingMethod || mongoose.model<IShippingMethod>('ShippingMethod', ShippingMethodSchema);

export default ShippingMethod;

