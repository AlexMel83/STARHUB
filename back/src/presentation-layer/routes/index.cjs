const authRouteInit = require("./auth.routes.cjs");
const uploadsRouteInit = require("./uploads.routes.cjs");
const customersRouteInit = require("./customers.routes.cjs");
const dealsRouteInit = require("./deals.routes.cjs");
const commentsRouteInit = require("./comments.routes.cjs");

const routeInit = (app, express) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  authRouteInit(app);
  uploadsRouteInit(app);
  customersRouteInit(app);
  dealsRouteInit(app);
  commentsRouteInit(app);
};

module.exports = {
  routeInit,
};
