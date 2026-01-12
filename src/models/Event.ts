import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface IShowTime {
  date: Date;
  time: string;
}

interface IPricing {
  categoryId: string;
  price: number;
}

export interface IEvent extends Document {
  title: {
    ar: string;
    en: string;
  };
  venueId: Types.ObjectId;
  cityId: Types.ObjectId;
  showTimes: IShowTime[];
  pricing: IPricing[];
  image: string;
  currency: 'QAR' | 'SAR' | 'EGP' | 'AED' | 'BHD' | 'OMR' | 'MAD' | 'TRY';
  status: 'active' | 'soldOut' | 'cancelled' | 'draft';
  type: 'concert' | 'theater' | 'adventure' | 'festival' | 'comedy' | 'attraction' | 'sports';
  featured: boolean;
  rating?: number;
  originalPrice?: number;
  statusBadge?: {
    ar: string;
    en: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      ar: { type: String, required: true },
      en: { type: String },
    },
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    showTimes: [{
      date: { type: Date, required: true },
      time: { type: String, required: true },
    }],
    pricing: [{
      categoryId: { type: String, required: true },
      price: { type: Number, required: true },
    }],
    image: { type: String, required: true },
    currency: { 
      type: String, 
      enum: ['QAR', 'SAR', 'EGP', 'AED', 'BHD', 'OMR', 'MAD', 'TRY'],
      default: 'EGP'
    },
    status: {
      type: String,
      enum: ['active', 'soldOut', 'cancelled', 'draft'],
      default: 'active',
    },
    type: {
      type: String,
      enum: ['concert', 'theater', 'adventure', 'festival', 'comedy', 'attraction', 'sports'],
      default: 'concert',
    },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    originalPrice: { type: Number },
    statusBadge: {
      ar: { type: String },
      en: { type: String },
    },
  },
  { timestamps: true }
);

// Indexes for efficient queries
EventSchema.index({ cityId: 1, status: 1 });
EventSchema.index({ venueId: 1 });
EventSchema.index({ 'showTimes.date': 1 });
EventSchema.index({ featured: 1 });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
