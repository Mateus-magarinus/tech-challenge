import { Response } from "express";
import Action from "../actions/action";

class Controller {
  private action = new Action();

  public findMovie(req: any, res: Response) {
    console.log("[Controller] - findMovie ", req.body);

    return this.action
      .findMovie(req.body.movieName)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(err.code).send(err.message);
      });
  }

  public getFavorite(req: any, res: Response) {
    console.log("[Controller] - getFavorite ");

    return this.action
      .getFavorite()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(err.code).send(err.message);
      });
  }

  public addFavorite(req: any, res: Response) {
    console.log("[Controller] - addFavorite ");
    return this.action
      .addFavorite(req.body.imdbID)
      .then(() => {
        res.status(200).send("Successfully added to favorite list!");
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }

  public async deleteFavorite(req: any, res: Response) {
    console.log("[Controller] - deleteFavorite ");
    try {
      await this.action.deleteFavorite(req.params.imdbID);
      res.status(200).send("Data Favorite has been removed!");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
}

export default Controller;
