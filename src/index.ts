import express from 'express';

import luxembourg from './routes/scraper/luxembourg';

const app = express();

app.get('/', (request, response) => {
    response.send('Hello world!');
});

app.use('/scraper/luxembourg', luxembourg);

app.listen(5000);
