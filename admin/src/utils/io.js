import Axios from 'axios';
import { notification } from 'antd';
import { Base64 } from 'js-base64';

/**
 * use to create authorization headers
 * @param {*} token
 * @return uesrId_token
 */
let authorization = token => {
  if (token) {
    const base64 = Base64.encode(token + ':');
    return 'Basic ' + base64;
  }
  return null;
};

class Request {
  instance;
  constructor() {
    let token = localStorage.getItem('token') || '';
    this.instance = Axios.create({
      headers: {
        authorization: authorization(token)
      }
    });
    this.initInterceptors();
  }

  // 初始化拦截器
  initInterceptors() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );
  }

  // 设置自定义头部
  setHeader = (key, val) => {
    this.instance.defaults.headers.common[key] = val;
  };

  // 错误notify
  notify(message) {
    notification.error({
      message: '请求错误',
      description: `${message ||
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'}`
    });
  }

  // 错误处理
  handleError = error => {
    const { message, status } = error;
    switch (status) {
      case 401:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        this.notify(message || error);
        break;
    }
    return Promise.reject(error);
  };

  sendRequest(method, data) {
    let { path, params, options } = data;

    const _query = options ? { ...options, params } : { params };
    console.log(_query);
    return this.instance[method](path, _query.params).catch(this.handleError);
  }

  get(path, data = {}) {
    const { params } = data;

    let _path = path;
    if (params) {
      const keys = Object.keys(params);
      if (keys.length) {
        _path += '?';
        keys.forEach(key => {
          _path += params[key] ? `${key}=${params[key]}&` : '';
        });
      }
      _path = _path.replace(/&$/, '');
    }
    return this.sendRequest('get', { path: _path, data });
  }

  post(path, data) {
    return this.sendRequest('post', { path, ...data });
  }

  put(path, data) {
    return this.sendRequest('put', { path, ...data });
  }

  patch(path, data) {
    return this.sendRequest('patch', { path, ...data });
  }

  delete(path, data) {
    return this.sendRequest('delete', { path, ...data });
  }
}
const request = new Request();

export default request;
