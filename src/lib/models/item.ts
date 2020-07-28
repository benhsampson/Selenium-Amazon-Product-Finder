import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    prices: {
      type: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Price', required: true},
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model('Item', ItemSchema);

export default Item;
