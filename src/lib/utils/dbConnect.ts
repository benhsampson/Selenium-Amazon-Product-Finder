import mongoose from 'mongoose';

type Connection = mongoose.Connection & {isConnected: boolean};

const connection: Connection = ({isConnected: false} as unknown) as Connection;

export default async function dbConnect() {
  // not initializing the connection because re-connecting results in a `cannot overwrite `X` model` error
  if (connection && connection.isConnected) return;

  const db = await mongoose.connect(
    // TODO: store password as an environment variable
    'mongodb+srv://ben:admin@cluster0.zpqyb.mongodb.net/amazon_price_tracker?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  mongoose.set('debug', true);

  connection.isConnected = db.connections[0].readyState == 2;
}
