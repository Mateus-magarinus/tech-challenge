import HttpClient from "../lib/httpClient";
import config from "../config/config";
import { AxiosError } from "axios";
import Mongo from "../db/mongo";
class Service {
  private httpClient = new HttpClient(config.provider.baseURL);

  async findMovie(movieName: string) {
    console.log("[Service] - getMovie");

    const { data } = await this.httpClient
      .getData(`?apikey=${config.constants.API_KEY}&s=${movieName}`)
      .catch((error: AxiosError) => {
        throw error;
      });

    Mongo.setDataSearched(movieName);
    Mongo.setDataMovie(data.Search);
    return data.Search;
  }
}

export default Service;
