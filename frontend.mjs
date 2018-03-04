import express from 'express';
import sse from 'server-sent-events';

// http://bayn.es/real-time-web-applications-with-server-sent-events-pt-1/
// https://github.com/zacbarton/node-server-sent-events/blob/master/index.js
// https://github.com/toverux/expresse
// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#content

const app = express();

app.use(express.static('.'));

let nextSearchId = 1;
const searches = {};

app.get('/search/:query', (req, res) => {
  const query = req.params.query;
  if (query === 'foo') {
    res.send({
      final: true,
      results: [
        'foo',
        'bar',
        'baz',
      ],
    });
  } else {
    const searchId = nextSearchId++;
    res.send({
      final: false,
      searchId: searchId,
    });
  }
});

const sseJson = (data) => 'data: ' + JSON.stringify(data) + '\n\n';

app.get('/listen/:searchId', sse, (req, res) => {
  const searchId = req.params.searchId;
  console.log('listen', searchId);
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
