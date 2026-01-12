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
  },
  { timestamps: true }
);

// Prevent model recompilation in development
const City: Model<ICity> = mongoose.models.City || mongoose.model<ICity>('City', CitySchema);

export default City;
