import mongoose from 'mongoose';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'user'; //TODO: Improve conversion
  password: string;
  createdAt: Date,
  updatedAt: Date

  toJSON: Function
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'user', required: true },
  password: { type: String, required: true }
},{ timestamps: true });

UserSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
  }
}); 

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

