import Axios from 'axios';
import type {AxiosRequestConfig} from 'axios';

export default class AuthService {
  domain: string;

  constructor(domain: string) {
    this.domain = domain || 'http://localhost:3000';
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken = () => localStorage.getItem('id_token');

  setToken = (token: string) => localStorage.setItem('id_token', token);

  async login(email: string, password: string) {
    return this.fetch(`${this.domain}/api/login`, {
      method: 'POST',
      data: JSON.stringify({ email, password});
    }).then(res => {
      console.log(res.data);
      this.setToken(res.data);
      // return this.fetch(`${this.domain}/api/protected`, {
      //   method: 'GET',
      // });
    });
  }

  async fetch(url: string, options: AxiosRequestConfig) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: '',
    };

    if (this.isLoggedIn()) {
      headers['Authorization'] = `Bearer + ${this.getToken()}`;
    }

    return Axios.get(url, {headers, ...options})
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch(err => {
        throw err;
      });
  }
}
