import { Builder, By } from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox';

const startUrl =
    'https://statistiques.public.lu/stat/TableViewer/tableView.aspx?ReportId=13050&IF_Language=eng&MainTheme=3&FldrName=5&RFPath=48';

const downloadDir = '/home/an4cr0n/Downloads/Selenium';

const options = new firefox.Options();

options.headless();
options.setPreference('browser.download.dir', downloadDir);
options.setPreference('browser.download.folderList', 2);
options.setPreference('browser.helperApps.neverAsk.saveToDisk', 'application/x-csv');

export const isServiceAvailable = async (): Promise<boolean> => {
    return true;
};

export const scrapeData = async (): Promise<boolean> => {
    const driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
    await driver.get(startUrl);
    await driver.findElement(By.name('CSVButton')).click();
    await driver.quit();

    return true;
};

scrapeData();
