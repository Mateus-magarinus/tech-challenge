import Service from "../services/service";
// import RedisClient from "../cache/redis";
import config from "../config/config";
import Mongo from "../db/mongo";
import { Movie } from "../models/interfaces/movie";

class Action {
  private service = new Service();

  // private redisClient = new RedisClient("techChallenge", config.redis);

  async findMovie(movieName: string) {
    console.log("[Action] - findMovie ", movieName);
    try {
      // const cached = await this.redisClient.getValue(`findMovie::${movieName}`);
      // if (!cached) {
      let data;
      const searched = await Mongo.getDataSearched(movieName);
      if (searched) {
        data = await Mongo.getDataMovie(movieName);

        data = data.filter(
          (movie: Movie, index: any, self: any) =>
            index === self.findIndex((t: any) => t.imdbID === movie.imdbID)
        );
      } else {
        data = await this.service.findMovie(movieName);
        await Mongo.setDataSearched(movieName);
        Mongo.setDataMovie(data);
      }

      // this.redisClient.setValue(
      //   `findMovie::${movieName}`,
      //   data,
      //   config.redis
      // );
      return data;
      // }
      // return cached;
    } catch (error) {
      throw error;
    }
  }

  async getFavorite() {
    console.log("[Action] - getFavorite ");
    try {
      const favorites = await Mongo.getDataFavorite();
      return favorites;
    } catch (error) {
      throw error;
    }
  }

  async addFavorite(imdbID: string) {
    console.log("[Action] - addFavorite ", imdbID);
    try {
      let data = await Mongo.getDataMovieByImdbID(imdbID);

      if (data.length === 0) {
        throw new Error(`imdbID: ${imdbID} - not found in database.`);
      }

      await Mongo.setDataFavorite(data[0]);
    } catch (error) {
      throw error;
    }
  }

  async deleteFavorite(imdbID: string) {
    console.log("[Action] - deleteFavorite");
    await Mongo.removeDataFavorite(imdbID).catch((err) => {
      throw err;
    });
  }
}
export default Action;
