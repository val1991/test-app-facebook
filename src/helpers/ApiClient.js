import axios from 'axios';

export class Api {
  static client = null;

  static init(store) {
    if (!Api.client) {
      Api.client = axios.create({
        baseURL: 'http://localhost:8080',
      });
    }
  }
}