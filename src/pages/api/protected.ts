import type {NextApiRequest, NextApiResponse} from 'next';

import withPassport, {passport} from '../../lib/utils/withPassport';

const protectedRoute = (req: NextApiRequest, res: NextApiResponse) => {
  return passport.authenticate('jwt', {session: false})(req, res, () => {
    res.status(200).json({message: 'successful authentication'});
  });
};

export default withPassport(protectedRoute);
