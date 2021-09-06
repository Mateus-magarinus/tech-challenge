export = {
  provider: {
    baseURL: "http://www.omdbapi.com/",
  },
  constants: {
    CONTEXT_PATH: "/tech-challenge",
    API_KEY: "925eba28",
  },
  redis: {
    nodes: {
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
    },
    TTL: 600,
  },
  mongodb: {
    uri: "mongodb+srv://db_user:bb9zEtvcienLvgH@cluster0.hls9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  },
};
