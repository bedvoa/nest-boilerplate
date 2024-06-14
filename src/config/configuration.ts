export default () => ({
  port: parseInt(process.env.NODE_PORT, 10) || 8888,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3305,
  },
});
