const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  notFoundHandler,
  errorHnadler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routes/loginRouter");
const userRouter = require("./routes/userRouter");
const inboxRouter = require("./routes/inboxRouter");

const app = express();
dotenv.config();

//database connection mongodb local

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB is connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB is not connected:", error);
  });

//request parsers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine

app.set("view engine", "ejs");

//set static folder

app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//route setup

app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

// not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHnadler);

app.listen(process.env.PORT, () => {
  console.log(`The server is running at http://localhost:${process.env.PORT}`);
});
