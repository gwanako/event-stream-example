import express from 'express';

const app = express();

const data = {};

app.get('/get/:key', (req, res) => {
  res.send(data[req.params.key]);
});

app.post('/set/:key', (req, res) => {
  data[req.params.key] = req.body;
  res.send();
});

app.listen(8000);
