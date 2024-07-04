const authRouteInit = require("./auth.routes.cjs");

const routeInit = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  authRouteInit(app);
};

module.exports = {
  routeInit,
};
