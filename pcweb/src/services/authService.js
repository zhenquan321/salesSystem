import axios from 'axios';
import {
  ADMIN_API
} from '../constants';
import { postData } from '../utils/postData';

const url = `${ADMIN_API}/admin/login`

const post = async (username, password) => {
  console.log(url)
  return await axios.post(url, postData({
    email: username,
    password: password
  }))
}

export default {
  post
}
