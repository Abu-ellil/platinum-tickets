import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface ICategory {
  id: string;
  label: string;
  color: string;
  defaultPrice: number;
}

export interface IVenue extends Document {
  name: {
    ar: string;
    en: string;
  };
  cityId: Types.ObjectId;
  theaterId: string; // Reference to theater layout (platinum-stage, manama-amphitheater)
  image: string;
  categories: ICategory[];
  createdAt: Date;
  updatedAt: Date;
}

const VenueSchema = new Schema<IVenue>(
  {
    name: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    theaterId: { type: String, required: true },
    image: { type: String, required: true },
    categories: [{
      id: { type: String, required: true },
      label: { type: String, required: true },
      color: { type: String, required: true },
      defaultPrice: { type: Number, required: true },
    }],
  },
  { timestamps: true }
);

// Index for efficient city-based queries
VenueSchema.index({ cityId: 1 });

const Venue: Model<IVenue> = mongoose.models.Venue || mongoose.model<IVenue>('Venue', VenueSchema);

export default Venue;
