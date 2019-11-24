import { Builder, By } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox';
import * as dotenv from 'dotenv';

dotenv.config();

const country = 'Luxembourg';

const startUrl =
    'https://statistiques.public.lu/stat/TableViewer/tableView.aspx?ReportId=13050&IF_Language=eng&MainTheme=3&FldrName=5&RFPath=48';

const downloadDir = String(process.env.DATA_DOWNLOAD_DIR + '/' + country);

const options = new firefox.Options();

options.headless();
options.setPreference('browser.download.dir', downloadDir);
options.setPreference('browser.download.folderList', 2);
options.setPreference('browser.helperApps.neverAsk.saveToDisk', 'application/x-csv');

export const isServiceAvailable = async (): Promise<boolean> => {
    const driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
    await driver.get(startUrl);

    try {
        await driver.findElement(By.name('CSVButton'));
    } catch (error) {
        await driver.quit();
        return false;
    }

    return true;
};

export const scrapeData = async (): Promise<boolean> => {
    const driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
    await driver.get(startUrl);

    try {
        await driver.findElement(By.name('CSVButton')).click();
    } catch (error) {
        await driver.quit();
        return false;
    }

    await driver.quit();

    return true;
};
