import request from 'request';

const url = 'http://localhost:8000';

export async function get(key) {
  return new Promise((resolve, reject) => {
    request.get(url + '/get/' + key, (err, res, body) => {
      if (err) reject(err);
      else resolve(body);
    });
  });
};

export async function set(key, value) {
  return new Promise((resolve, reject) => {
    request.post(url + '/set/' + key, { json: value }, (err, res, body) => {
      if (err) reject(err);
      else resolve(body);
    });
  });
};

export default { get, set };
