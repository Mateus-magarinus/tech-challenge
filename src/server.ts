import App from "./app";

const port = process.env.PORT || "8080";

App.listen(port, () => {
  console.log(`[Server] server running in ${port}`);
});

module.exports = App;
