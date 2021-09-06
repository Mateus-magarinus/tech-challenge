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
    data.forEach((movie: Movie) => {
      const newMovie = new this.MovieModel(movie);
      newMovie.save((error) => {
        if (error) {
          console.log(`Error trying to save: ${error}`);
        } else {
          console.log("Data Movie has been saved!");
        }
      });
    });
  }

  static getDataMovie(title: string): any {
    return this.MovieModel.find(
      { Title: { $regex: title, $options: "i" } },
      { _id: 0 }
    )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  static setDataSearched(title: any) {
    const newSearch = new this.SearchedModel({ Title: title });
    newSearch.save((error) => {
      if (error) {
        console.log(`Error trying to save: ${error}`);
      } else {
        console.log("Data Search has been saved!");
      }
    });
  }

  static getDataSearched(title: string) {
    return this.SearchedModel.find({ Title: title })
      .then((response) => {
        if (response.length > 0) {
          return true;
        }
        return false;
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default Mongo;
