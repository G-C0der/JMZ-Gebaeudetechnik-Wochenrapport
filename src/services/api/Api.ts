import axios from 'axios';
import {serverAPIBaseURL} from '../../config';
import { storage } from "../index";
import Toast from "react-native-toast-message";

class Api {
  api = axios.create({
    baseURL: serverAPIBaseURL
  });

  constructor() {
    this.api.interceptors.request.use(async (config) => {
      const token = await storage.retrieveToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.api.interceptors.response.use(
      async (res) => {
        const severity = res.data.severity ?? 'success';
        const message = res.data.message ?? res.data;

        Toast.show({
          type: severity,
          text1: message
        });

        return res;
      },
      async (err) => {
        const { res } = err;
        let severity, message;
        if (!res) {
          severity = 'error';
          message = 'Error trying to reach server.';
        } else if (res.status === 500) {
          severity = 'error';
          message = 'An unexpected server error occurred.';
        } else {
          severity = res.data.severity ?? 'error';
          message = res.data.message ?? res.data;
        }

        Toast.show({
          type: severity,
          text1: message
        });

        if (res.status === 401) {
          await storage.deleteToken();
          window.location.reload();
        }

        return Promise.reject(err);
      }
    );
  }
}

export {
  Api
};
