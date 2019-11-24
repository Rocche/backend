import { Builder, By } from 'selenium-webdriver';

const startUrl =
    'https://statistiques.public.lu/stat/TableViewer/tableView.aspx?ReportId=13050&IF_Language=eng&MainTheme=3&FldrName=5&RFPath=48';

export const isServiceAvailable = async (): Promise<boolean> => {
    return true;
};

export const scrapeData = async (): Promise<boolean> => {
    const driver = await new Builder().forBrowser('firefox').build();
    await driver.get(startUrl);
    await driver.findElement(By.name('CSVButton')).click();
    //await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);
    //await driver.quit();

    return true;
};

isServiceAvailable();
