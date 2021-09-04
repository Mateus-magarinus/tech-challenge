import Service from "../services/service";

class Action {
  private service = new Service();

  async findMovie(movieName: string) {
    console.log("[Controller] - getMovie ", movieName);
    try {
      const data = await this.service.findMovie(movieName);
      return data;
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
