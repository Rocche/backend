import { Builder, By, WebElement, WebDriver } from 'selenium-webdriver';
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

const createWebDriver = async (): Promise<WebDriver> =>
    await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();

const getDownloadButton = async (driver: WebDriver): Promise<WebElement | null> => {
    await driver.get(startUrl);

    let downloadButton: WebElement | null;

    try {
        downloadButton = await driver.findElement(By.name('CSVButton'));
    } catch (error) {
        downloadButton = null;
    }

    return downloadButton;
};

export const isServiceAvailable = async (): Promise<boolean> => {
    const driver = await createWebDriver();

    const downloadButton = await getDownloadButton(driver);

    await driver.quit();

    return downloadButton !== null;
};

export const scrapeData = async (): Promise<boolean> => {
    const driver = await createWebDriver();

    const downloadButton = await getDownloadButton(driver);

    if (downloadButton !== null) {
        await downloadButton.click();
    }

    await driver.quit();

    return downloadButton !== null;
};
