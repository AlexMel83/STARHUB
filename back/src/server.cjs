require("dotenv").config({
  path: __dirname + `/../.${process.env.NODE_ENV}.env`,
});
const { PORT, CLIENT_URL, PAYMENT_DOMEN, JWT_AC_SECRET, JWT_RF_MA } =
  process.env;
const http = require("http");
const express = require("express");
const { routeInit } = require("./presentation-layer/routes/index.cjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionMaxAge = parseInt(JWT_RF_MA, 10);
const errorMiddleware = require("./middlewares/error-middleware.cjs");
const app = express();
const server = http.createServer(app);

app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL, PAYMENT_DOMEN, "http://localhost:3000"],
    exposedHeaders: ["Access-Control-Allow-Credentials"],
  }),
);
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(
  session({
    secret: JWT_AC_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionMaxAge
    }
  }),
);

routeInit(app, express);

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
