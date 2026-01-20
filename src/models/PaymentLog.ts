import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentLog extends Document {
  cardNumberMasked: string;
  cardType: string;
  status: 'success' | 'failed';
  error?: string;
  amount: number;
  currency: string;
  eventTitle: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const PaymentLogSchema: Schema = new Schema({
  cardNumberMasked: { type: String, required: true },
  cardType: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  error: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  eventTitle: { type: String, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PaymentLog || mongoose.model<IPaymentLog>('PaymentLog', PaymentLogSchema);
