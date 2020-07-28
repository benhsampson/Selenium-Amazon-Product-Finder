import type {NextApiRequest, NextApiResponse} from 'next';

import withDb from '../../../lib/utils/withDb';
import Item from '../../../lib/models/item';
import Price from '../../../lib/models/price';

export default withDb(async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({name: 'John Doe'}));
});
