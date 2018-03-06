import axios from 'axios';

const instance = axios.create();

function createAPI(baseURL) {
  return function (conf) {
    conf = conf || {};
    let axiosInstance = instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method
    }, conf.opts));
    return new Promise((resolve, reject) => {
      axiosInstance.then((d) => {
        if (d.data.success === true) {
          resolve(d.data.data, d);
        } else {
          reject(d.data.msg);
        }
      }, (e) => {
        reject(e);
      });
    });
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g');
    url = url.replace(r, opts.path[key]);
  });

  return url;
}

export {
  createAPI,
  convertRESTAPI
};
