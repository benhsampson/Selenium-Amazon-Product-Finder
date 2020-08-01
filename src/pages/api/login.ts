import type {NextApiResponse, NextApiRequest} from 'next';

import Cors from 'cors';

import runMiddleware from '../../lib/utils/runMiddleware';
import dbConnect from '../../lib/utils/dbConnect';
import User from '../../lib/models/user';
// import withPassport, {passport} from '../../lib/utils/withPassport';

// const authenticate = (
//   method: string,
//   req: NextApiRequest,
//   res: NextApiResponse
// ) =>
//   new Promise(async (resolve, reject) => {
//     return passport.authenticate(
//       method,
//       {failureRedirect: '/login-failure', successRedirect: 'login-success'},
//       (err: Error, tokenObj) => {
//         if (err) {
//           return reject(err);
//         }

//         return resolve(tokenObj);
//       }
//     )(req, res);
//   });

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'must be a POST request'});
  }

  await runMiddleware(req, res, Cors({origin: 'localhost', credentials: true}));
  await dbConnect();

  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) return res.status(401).send({message: 'could not find user'});
    if (!(await user.comparePassword(password)))
      return res.status(401).send({message: 'wrong password'});

    const tokenObj = user.issueJwt();

    return res.status(200).send(tokenObj);
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

// export default withPassport(login);
export default login;
