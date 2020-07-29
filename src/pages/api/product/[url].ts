import type {NextApiRequest, NextApiResponse} from 'next';

import {Builder, By, until} from 'selenium-webdriver';
import Chrome from 'selenium-webdriver/chrome';

const PATH = `C:\\Users\\SampsonB\\Downloads\\chromedriver_win32\\chromedriver.exe`

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const { query: { url } } = req;

    Chrome.setDefaultService(new Chrome.ServiceBuilder(PATH).build());
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.nike.com/launch/t/air-jordan-34-zion-pe-noah-1');   
        const price_elem = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'product-info)]"))));
        const price_unsanitized = await price_elem.getAttribute('class');
        console.log(price_unsanitized);
    } finally {
        await driver.quit();
    }
}