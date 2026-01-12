import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  label: {
    ar: string;
    en: string;
  };
  image: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    label: {
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
