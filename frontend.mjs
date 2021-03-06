import express from 'express';
import sse from 'server-sent-events';
import db from './dbClient.mjs';

// http://bayn.es/real-time-web-applications-with-server-sent-events-pt-1/
// https://github.com/zacbarton/node-server-sent-events/blob/master/index.js
// https://github.com/toverux/expresse
// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#content

const app = express();

app.use(express.static('.'));

const searches = {};

const sendResults = (res, results) => {
  if (results.final) {
    res.setHeader('Cache-Control', 'public');
    res.setHeader('Cache-Control', 'max-age=600');
  } else {
    res.setHeader('Cache-Control', 'no-cache');
  }
  sender(results);
};

// TODO: send time of last response in request, to avoid sending same twice (only partial solution to the problem)

app.get('/search/:query', (req, res) => {
  const query = req.params.query;
  const results = searches[query];
  if (results) {
    sendResults(res, results);
    return;
  }
  db.get(query).then((results) => {
    if (results) {
      searches[query] = results;
      sendResults(res, results);
    } else {
      // TODO: begin search
      res.send({
        wait: true,
      });
    }
  });
});

const sseJson = (data) => 'data: ' + JSON.stringify(data) + '\n\n';

app.get('/results/:query', sse, (req, res) => {
  const query = req.params.query;
  console.log('listen', query);
  res.sse(sseJson({
    foo: 'bar',
  }));
  setTimeout(() => {
    res.sse(sseJson({
      time: Date.now(),
    }));
    setTimeout(() => {
      res.sse(sseJson({
        close: true,
      }));
    }, 2000);
  }, 2000);
});

app.listen(3000);
