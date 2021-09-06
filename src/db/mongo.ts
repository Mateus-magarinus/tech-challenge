import mongoose from "mongoose";
import { Movie } from "../models/interfaces/movie";
class Mongo {
  private static movieSchema = new mongoose.Schema({
    Title: String,
    Year: String,
    imdbID: String,
    Type: String,
    Poster: String,
  });

  private static searchedSchema = new mongoose.Schema({
    Title: String,
  });

  private static MovieModel = mongoose.model("Movie", Mongo.movieSchema);

  private static FavoriteModel = mongoose.model("Favorites", Mongo.movieSchema);

  private static SearchedModel = mongoose.model(
    "Searched",
    Mongo.searchedSchema
  );

  static async connect(config: any): Promise<void> {
    const uri = config.uri;
    mongoose.Promise = global.Promise;
    mongoose.connect(uri).catch((err) => {
      console.log(`Error connection: ${err}`);
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected!");
    });
  }

  static disconnect(message: string): void {
    mongoose.connection.close(() => {
      console.log(`[Mongo] - disconnect - Mongoose disconnected by ${message}`);
    });
  }

  static setDataMovie(data: any) {
    if (!Array.isArray(data)) {
      data = [data];
    }
    // TO DO:
    // - Find duplicate data and erase them
    // - compare by imdbID
    try {
      data.forEach(async (movie: Movie) => {
        const newMovie = new this.MovieModel(movie);
        await newMovie.save((error) => {
          if (error) {
            console.log(`Error trying to save: ${error}`);
          }
        });
      });
    } catch (error: any) {
      throw new Error(`Error trying to save: ${error.message}`);
    }
  }

  static getDataMovie(title: string): any {
    return this.MovieModel.find(
      { Title: { $regex: title, $options: "i" } },
      { _id: 0 }
    )
      .lean()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(`Error trying to find: ${error.message}`);
      });
  }

  static async setDataSearched(title: any) {
    try {
      const newSearch = new this.SearchedModel({ Title: title });
      await newSearch.save((error) => {
        if (error) {
          console.log(`Error trying to save: ${error}`);
          throw error;
        }
      });
    } catch (error: any) {
      throw new Error(`Error trying to save: ${error.message}`);
    }
  }

  static getDataSearched(title: string) {
    return this.SearchedModel.find({ Title: title })
      .lean()
      .then((response) => {
        if (response.length > 0) {
          return true;
        }
        return false;
      })
      .catch((error) => {
        throw new Error(`Error trying to find: ${error.message}`);
      });
  }

  static getDataMovieByImdbID(imdbID: string) {
    return this.MovieModel.find({ imdbID: imdbID }, { _id: 0, __v: 0 })
      .lean()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(`Error trying to find: ${error.message}`);
      });
  }

  static async setDataFavorite(data: any) {
    try {
      const newFavorite = new this.FavoriteModel(data);
      await newFavorite.save((error) => {
        if (error) {
          console.log(`Error trying to save: ${error}`);
          throw error;
        }
      });
    } catch (error: any) {
      throw new Error(`Error trying to save: ${error.message}`);
    }
  }

  static getDataFavorite() {
    return this.FavoriteModel.find({})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new Error(`Error trying to find: ${error.message}`);
      });
  }

  static async removeDataFavorite(imdbID: string) {
    await this.FavoriteModel.deleteOne({ imdbID: imdbID })
      .then((response) => {
        if (response.deletedCount === 0) {
          throw new Error(`${imdbID} not found in favorite list.`);
        }
        console.log("Data Favorite has been removed!");
      })
      .catch((error) => {
        throw new Error(`Error trying to remove: ${error.message}`);
      });
  }
}

export default Mongo;
