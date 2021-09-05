import IoRedis from "ioredis";
class RedisClient {
  private keyPrefix: string;

  private client: any;

  static redisInstance: any;

  constructor(keyPrefix: string, config: any) {
    this.keyPrefix = keyPrefix;
    this.client = RedisClient.getInstance(config);
  }

  static getInstance(config: any) {
    if (RedisClient.redisInstance) {
      return RedisClient.redisInstance;
    }
    console.log("[RedisClient] - getInstance");
    RedisClient.redisInstance = new IoRedis(
      config.nodes.port,
      config.nodes.host
    );
    RedisClient.redisInstance.on("error", (err: any) => {
      console.log(
        `Error occurred while connecting or accessing redis server ${err}`
      );
    });

    return RedisClient.redisInstance;
  }

  setValue(key: string, value: any, config: any) {
    console.log(`Setting property : ${this.keyPrefix}:${key}`);
    return Promise.resolve(
      this.client.set(
        `${this.keyPrefix}:${key}`,
        JSON.stringify(value),
        "EX",
        config.TTL
      )
    );
  }

  getValue(key: string) {
    console.log(`Getting property : ${this.keyPrefix}:${key}`);
    return Promise.resolve(this.client.get(`${this.keyPrefix}:${key}`)).then(
      (result) => {
        if (!result || JSON.stringify(result) === JSON.stringify({}))
          return result;

        return JSON.parse(result);
      }
    );
  }
}

export default RedisClient;
