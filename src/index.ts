import express from 'express';

import luxembourg from './routes/scraper/luxembourg';

import { getData } from './loader'; // getData will return luxembourg's data so far
import { DataManager } from './managers/DataManager';
const app = express();

app.get('/', (request, response) => {
    response.send('Hello world!');
});

app.use('/scraper/luxembourg', luxembourg);
///////////////////DEBUG ROUTES//////////////////////////
app.get('/readCSV-luxembourg', (request, response) => {
    response.send(getData('luxembourg', '.csv'));
});
///////////////////////////////////////////////////////

///////////////EXAMPLE ROUTES FOR TESTING FRONTEND//////////////////
app.get('/api/years/:country', (request, response) => {
    let country = request.params.country;
    let dataManager = new DataManager();
    let result = dataManager.getAvailableYears(country);
    response.send(result);
});

app.get('/api/data/:country/:year', (request, response) => {
    let country = request.params.country;
    let year = +request.params.year;
    let dataManager = new DataManager();
    let result = dataManager.getDataFromCountryAndYear(country, year);
    response.send(result);
});

app.listen(5000);
