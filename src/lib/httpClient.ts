import axios, { AxiosInstance } from "axios";

class HttpClient {
  private readonly apiInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.apiInstance = axios.create({
      baseURL,
    });
  }

  getData(params: string) {
    return this.apiInstance.get(params);
  }
}

export default HttpClient;
