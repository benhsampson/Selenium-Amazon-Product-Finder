import type {NextApiRequest, NextApiResponse} from 'next';

import {Builder, By, Key, until} from 'selenium-webdriver';
import Chrome from 'selenium-webdriver/chrome';

const PATH = `C:\\Program Files (x86)\\chromedriver\\chromedriver.exe`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {search},
  } = req;

  Chrome.setDefaultService(new Chrome.ServiceBuilder(PATH).build());
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://amazon.com');

    const elem = await driver.findElement(By.name('field-keywords'));
    await elem.clear();
    await elem.sendKeys(search as string, Key.RETURN);

    const first_result = await driver.wait(
      until.elementIsVisible(
        driver.findElement(
          By.xpath("//span[@data-component-type='s-product-image']/a[1]")
        )
      )
    );
    first_result.click();

    const price_elem = await driver.wait(
      until.elementLocated(By.id('priceblock_ourprice'))
    );

    const price_unsanitized = await price_elem.getAttribute('textContent');

    console.log(price_unsanitized);

    res.send(`Amazon Price: ${price_unsanitized}`);
  } finally {
    await driver.quit();
  }
};
