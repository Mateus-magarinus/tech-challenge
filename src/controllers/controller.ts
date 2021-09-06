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
    console.log("[Controller] - getFavorite ");
    return this.action
      .addFavorite(req.body.imdbID)
      .then(() => {
        res.status(200).send("Successfully added to favorite list!");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }

  public deleteFavorite(req: any, res: Response) {
    console.log("[Controller] - getMovie");

    const movie = "filmes 2021";

    res.status(200).send(`${movie} ${JSON.stringify(req.headers)}`);
  }

  public getMovie(req: any, res: Response) {
    console.log("[Controller] - getMovie");

    const movie = "filmes 2021";

    res.status(200).send(`${movie} ${JSON.stringify(req.headers)}`);
  }
}

export default Controller;
