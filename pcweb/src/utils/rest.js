/**
 * 封装axios 新增头部添加authorization的方法
 */
import axios from "axios";
import { message } from "antd";
import { authorization } from "./authorization";
import { postData, patchData } from "@/utils";
import qs from "qs";

/**
 * 提示函数
 * 显示一秒后关闭
 */
const tip = msg => {
  message.warning(this.props.location.state.message);
};

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // router.replace({
  //     path: '/',
  //     query: {
  //         redirect: router.currentRoute.fullPath
  //     }
  // });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  switch (status) {
    case 403:
      tip("登录过期，请重新登录");
      // 清除token
      // localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 404:
      tip("网络请求不存在");
      break;
    default:
      tip(other);
  }
};

// 响应拦截器
axios.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if (res.data.code !== "0" && res.data.msg) {
        tip(res.data.msg);
      }
      Promise.resolve(res);
    } else {
      Promise.reject(res);
    }
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在200的范围
      errorHandle(response.status, response.data.msg);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  }
);

const post = (adminId, token) => {
  return (url, data) => {
    return axios
      .create({
        headers: {
          authorization: authorization(adminId, token)
        }
      })
      .post(url, postData(data));
  };
};

const patch = (adminId, token) => {
  return (url, data) => {
    return axios
      .create({
        headers: {
          authorization: authorization(adminId, token),
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .patch(url, patchData(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
  };
};

const get = (adminId, token) => {
  return (url, params) => {
    return axios
      .create({
        headers: {
          authorization: authorization(adminId, token)
        }
      })
      .get(url, {
        params
      });
  };
};

const remove = (adminId, token) => {
  return (url, params) => {
    return axios
      .create({
        headers: {
          authorization: authorization(adminId, token)
        }
      })
      .delete(url);
  };
};

export default {
  post,
  patch,
  get,
  remove
};
