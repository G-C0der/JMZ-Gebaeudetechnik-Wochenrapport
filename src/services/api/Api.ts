import axios from 'axios';
import {serverAPIBaseURL} from '../../config';
import { emitter, storage } from "../index";
import Toast from "react-native-toast-message";

class Api {
  api = axios.create({
    baseURL: serverAPIBaseURL
  });

  constructor() {
    this.api.interceptors.request.use(async (config) => {
      const tokenData = await storage.retrieveToken();
      if (tokenData && tokenData.token) config.headers.Authorization = `Bearer ${tokenData.token}`;
      return config;
    });

    this.api.interceptors.response.use(
      async (res) => {
        const severity = res.data.severity ?? 'success';
        const message = res.data.message ?? (typeof res.data === 'string' ? res.data : null);

        if (message) {
          Toast.show({
            type: severity,
            text1: message
          });
        }

        return res;
      },
      async (err) => {
        const { response: res } = err;
        let severity = 'error', message;
        if (!res) {
          message = 'Error trying to reach server.';
        } else if (res.status === 500) {
          message = 'An unexpected server error occurred.';
        } else if (res.status === 401) {
          message = 'Unauthorized.';

          await storage.deleteToken();

          emitter.emit('unauthorized');
        } else {
          severity = res.data.severity ?? 'error';
          message = res.data.message ?? res.data;
        }

        Toast.show({
          type: severity,
          text1: message
        });

        return Promise.reject({
          response: {
            data: {
              severity,
              message
            }
          }
        });
      }
    );
  }
}

export {
  Api
};
