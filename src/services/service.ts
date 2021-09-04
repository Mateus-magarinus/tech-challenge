import HttpClient from "../lib/httpClient";
import config from "../config/config";
import { AxiosError } from "axios";

class Service {
  private httpClient = new HttpClient(config.provider.baseURL);

  async findMovie(movieName: string) {
    console.log("[Service] - getMovie");

    const { data } = await this.httpClient
      .getData(`?apikey=${config.constants.API_KEY}&s=${movieName}`)
      .catch((error: AxiosError) => {
        throw error;
      });

    return data;
  }
}

export default Service;
