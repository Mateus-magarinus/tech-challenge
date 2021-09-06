import Service from "../services/service";
import RedisClient from "../cache/redis";
import config from "../config/config";
import Mongo from "../db/mongo";
import { Movie } from "../models/interfaces/movie";

class Action {
  private service = new Service();

  private redisClient = new RedisClient("techChallenge", config.redis);

  async findMovie(movieName: string) {
    console.log("[Action] - getMovie ", movieName);
    try {
      const cached = await this.redisClient.getValue(`findMovie::${movieName}`);
      if (!cached) {
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
        }

        this.redisClient.setValue(
          `findMovie::${movieName}`,
          data,
          config.redis
        );
        return data;
      }
      return cached;
    } catch (error) {
      throw error;
    }
  }

  getFavorite() {
    console.log("[Controller] - getMovie");
  }

  addFavorite() {
    console.log("[Controller] - getMovie");
  }

  deleteFavorite() {
    console.log("[Controller] - getMovie");
  }

  getMovie() {
    console.log("[Controller] - getMovie");
  }
}
export default Action;
