import mongoose from 'mongoose';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: Date,
  updatedAt: Date

  toJSON: Function
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: Number, default: 'user' },
  password: { type: String, required: true }
},{ timestamps: true });

UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
}); 


const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

