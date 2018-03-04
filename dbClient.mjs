import request from 'request';

export async function get(key) {
  return new Promise((resolve, reject) => {
    request('http://localhost:8000/get/' + key, (err, res, body) => {
      resolve(body);
    });
  });
};

export async function put(key, value) {
  return new Promise((resolve, reject) => {
    request.post('http://localhost:8000/put/' + key, { json: value }, () => {
      resolve();
    });
  });
};
