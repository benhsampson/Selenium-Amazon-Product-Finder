import type {NextApiRequest, NextApiResponse} from 'next';

import {Builder, By, until} from 'selenium-webdriver';
import Chrome from 'selenium-webdriver/chrome';

const PATH = `C:\\Program Files (x86)\\chromedriver\\chromedriver.exe`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const { query: { url } } = req;

  Chrome.setDefaultService(new Chrome.ServiceBuilder(PATH).build());
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(
      'https://www.adidas.com.au/adidas-4d-run-1.0-shoes/FV6960.html'
    );
    const price_elem = await driver.wait(
      until.elementLocated(
        // By.xpath("//div[contains(@class, 'product-info')]/div[1]")
        By.className('gl-price__value')
      )
    );
    const price_unsanitized = await price_elem.getAttribute('textContent');
    console.log(price_unsanitized);
  } finally {
    await driver.quit();
  }
};
