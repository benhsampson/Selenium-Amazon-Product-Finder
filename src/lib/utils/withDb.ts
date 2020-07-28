import type {NextApiRequest, NextApiResponse} from 'next';
import type {Connection} from 'mongoose';

import * as mongoose from 'mongoose';

export default (fn: Function) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let db: Connection;
  try {
    await mongoose.connect(
      // TODO: store password as an environment variable
      'mongodb+srv://ben:admin@cluster0.zpqyb.mongodb.net/amazon_price_tracker?retryWrites=true&w=majority',
      {useNewUrlParser: true}
    );
    db = mongoose.connection;
  } catch (err) {
    console.error.bind(console, 'DB connection error');
    throw err;
  }
  return fn(req, res);
};
