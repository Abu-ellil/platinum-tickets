import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICity extends Document {
  name: {
    ar: string;
    en: string;
  };
  country: {
    ar: string;
    en: string;
  };
  image: string;
  slug: string;
  flag: string;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const CitySchema = new Schema<ICity>(
  {
    name: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    country: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    flag: { type: String, required: true },
    currency: { type: String, required: true, default: 'SAR' },
  },
  { timestamps: true }
);

// Prevent model recompilation in development
const City: Model<ICity> = mongoose.models.City || mongoose.model<ICity>('City', CitySchema);

export default City;
