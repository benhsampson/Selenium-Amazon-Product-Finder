import type {NextApiRequest, NextApiResponse} from 'next';

// import {Builder, By, until} from 'selenium-webdriver';
// import Chrome from 'selenium-webdriver/chrome';

import cors from '../../../lib/utils/withCors';
import withPassport from '../../../lib/utils/withPassport';
import dbConnect from '../../../lib/utils/dbConnect';
import User from '../../../lib/models/user';

// const PATH = `C:\\Program Files (x86)\\chromedriver\\chromedriver.exe`;

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  return new Promise(async (resolve, reject) => {
    if (req.method !== 'POST') {
      return res.status(405).json({error: 'Must be a POST request'});
    }

    await dbConnect();

    try {
      const {
        name,
        email,
        password,
        phone,
        address_1,
        postcode,
        city,
        country,
        card_type,
        card_number,
        exp_month,
        exp_year,
        cvc_code,
      } = req.body;
      const user = await new User({
        name,
        email,
        password,
        phone,
        address_1,
        postcode,
        city,
        country,
        card_type,
        card_number,
        exp_month,
        exp_year,
        cvc_code,
      }).save();
      console.log(JSON.stringify(user));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
      return resolve(user);
    } catch (err) {
      res.status(500).end();
      return reject(err);
    }
  });
};

export default withPassport(register);
