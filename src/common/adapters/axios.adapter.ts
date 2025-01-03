import axios, { AxiosInstance } from "axios";
import { HttpsAdapter } from "../interfaces/https-adapter.interfaces";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpsAdapter {

  private axios: AxiosInstance = axios

  async get<T>(url: string, options?: any): Promise<T> {

    try {

      const { data } = await this.axios.get<T>(url, options);

      return data
    } catch (error) {
      console.log('ERROR GETTING DATA', error);
      throw new Error('Error getting data');
    }

  }
}