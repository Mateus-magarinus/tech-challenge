import HttpClient from "../lib/httpClient";
import config from "../config/config";
import { AxiosError } from "axios";
import Mongo from "../db/mongo";
class Service {
  private httpClient = new HttpClient(config.provider.baseURL);

  async findMovie(movieName: string) {
    console.log("[Service] - findMovie");

    const { data } = await this.httpClient
      .getData(`?apikey=${config.constants.API_KEY}&s=${movieName}`)
      .catch((error: AxiosError) => {
        throw error;
      });

    return data.Search;
  }
  async findMovieByImdbID(imdbID: string) {
    console.log("[Service] - findMovieByImdbID");

    const { data } = await this.httpClient
      .getData(`?apikey=${config.constants.API_KEY}&i=${imdbID}`)
      .catch((error: AxiosError) => {
        throw error;
      });

    return data.Search;
  }
}

export default Service;
