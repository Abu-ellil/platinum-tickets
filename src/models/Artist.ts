import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArtist extends Document {
  name: {
    ar: string;
    en: string;
  };
  image: string;
  bio?: {
    ar?: string;
    en?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ArtistSchema = new Schema<IArtist>(
  {
    name: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    image: { type: String, required: true },
    bio: {
      ar: { type: String },
      en: { type: String },
    },
  },
  { timestamps: true }
);

const Artist: Model<IArtist> = mongoose.models.Artist || mongoose.model<IArtist>('Artist', ArtistSchema);

export default Artist;
