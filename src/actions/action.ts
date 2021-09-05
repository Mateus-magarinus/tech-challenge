import Service from "../services/service";
import RedisClient from "../cache/redis";
import config from "../config/config";
class Action {
  private service = new Service();

  private redisClient = new RedisClient("techChallenge", config.redis);

  async findMovie(movieName: string) {
    console.log("[Action] - getMovie ", movieName);
    console.log(process.env.NODE_ENV);
    try {
      const cached = await this.redisClient.getValue(`findMovie::${movieName}`);
      console.log(cached);
      if (!cached) {
        const data = await this.service.findMovie(movieName);
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
