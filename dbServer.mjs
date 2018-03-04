import express from 'express';

const app = express();

const db = {};

app.get('/get/:key', (req, res) => {
  res.send(db[req.params.key]);
});

app.post('/put/:key', (req, res) => {
  db[req.params.key] = req.body;
  res.send();
});

app.listen(8000);
