import type {NextApiRequest, NextApiResponse} from 'next';

// import {Builder, By, until} from 'selenium-webdriver';
// import Chrome from 'selenium-webdriver/chrome';

import User from '../../../lib/models/user';
import withDb from '../../../lib/utils/withDb';

// const PATH = `C:\\Program Files (x86)\\chromedriver\\chromedriver.exe`;

export default withDb(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    email,
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
  console.log(user);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user));
});
