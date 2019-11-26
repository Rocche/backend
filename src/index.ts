import express from 'express';
import { getData } from './loader'; // getData will return luxembourg's data so far
const app = express();

app.get('/', (request, response) => {
    response.send('Hello world!');
});

///////////////////DEBUG ROUTES//////////////////////////
app.get('/readCSV-luxembourg', (request, response) => {
    response.send(getData('luxembourg', '.csv'));
});
///////////////////////////////////////////////////////

app.listen(5000);
