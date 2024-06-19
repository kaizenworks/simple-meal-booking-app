import mongoose from 'mongoose';

export interface IMeal {
  id: string;
  name: string;
  price: number;
  createdAt: Date,
  updatedAt: Date

  toJSON: Function
}

const MealSchema = new mongoose.Schema<IMeal>({
  name: { type: String, required: true },
  price: { type: Number, required: true }
},{ timestamps: true });

MealSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
  }
}); 


const Meal = mongoose.models?.Meal || mongoose.model<IMeal>('Meal', MealSchema);

export default Meal;

