import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  name: string;
  quantity: number;
  status: 'beklemede' | 'hazırlanıyor' | 'hazır'; // frontend uyumlu
  branchId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: {
      type: String,
      enum: ['beklemede', 'hazırlanıyor', 'hazır'],
      default: 'beklemede'
    },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true }, // 🔄 düzeltildi
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
