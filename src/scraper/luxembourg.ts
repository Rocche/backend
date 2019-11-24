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

const getDownloadButton = async (
    driver: WebDriver,
): Promise<{ downloadButton: WebElement | null; success: boolean }> => {
    await driver.get(startUrl);

    let downloadButton: WebElement | null = null;

    let success = true;

    try {
        downloadButton = await driver.findElement(By.name('CSVButtonx'));
    } catch (error) {
        success = false;
    }

    return { downloadButton, success };
};

export const isServiceAvailable = async (): Promise<boolean> => {
    const driver = await createWebDriver();

    const request = await getDownloadButton(driver);

    await driver.quit();

    return request.success;
};

export const scrapeData = async (): Promise<boolean> => {
    const driver = await createWebDriver();

    const { downloadButton, success } = await getDownloadButton(driver);

    if (downloadButton !== null) {
        await downloadButton.click();
    }

    await driver.quit();

    return success;
};
