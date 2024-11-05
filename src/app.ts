import express from 'express';
import { mdbClient } from './mongodb';
import AppRouter from './routers/AppRouter';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use('/api', AppRouter);

app.get('/', (req, res) => {
    res.send('Test successful.');
});

app.listen(PORT, async () => {
    await mdbClient.db('admin').command({ ping: 1 });
    console.log(`Listening on port ` + PORT);
});