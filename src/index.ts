import express from 'express';

import helmet from 'helmet';

import luxembourg from './routes/scraper/luxembourg';

import { getData } from './loader'; // getData will return luxembourg's data so far

const app = express();
app.use(helmet()); // Add security headers

app.get('/', (request, response) => {
    response.send('Hello world!');
});

app.use('/scraper/luxembourg', luxembourg);
///////////////////DEBUG ROUTES//////////////////////////
app.get('/readCSV-luxembourg', (request, response) => {
    response.send(getData('luxembourg', '.csv'));
});
///////////////////////////////////////////////////////

app.listen(5000);
