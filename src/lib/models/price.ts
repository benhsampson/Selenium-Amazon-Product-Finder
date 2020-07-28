import mongoose from 'mongoose';

const PriceSchema = new mongoose.Schema(
  {
    price: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const Price = mongoose.model('Price', PriceSchema);

export default Price;
