module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret!",
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "RgPZBfasiy",
    password: process.env.MYSQL_PASS || "TZCQ0EvWIe",
    database: process.env.MYSQL_DB || "RgPZBfasiy",
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  cache: {
    host: process.env.CACHE_SRV_HOST || "localhost",
    port: process.env.CACHE_SRV_PORT || 3003,
  },
  redis: {
    host:
      process.env.REDIS_SRV_HOST ||
      "redis-17572.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: process.env.REDIS_SRV_PORT || "17572",
    password: process.env.REDIS_SRV_PASS || "ypOXlBS8d9wPTa794c3ULnfbX872Ieq5",
  },
};
