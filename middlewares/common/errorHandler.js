const createError = require("http-errors");

// not found handler

const notFoundHandler = (req, res, next) => {
  next(createError(404, "content was not found"));
};

const errorHnadler = (err, req, res, next) => {
  res.render("error.ejs", {
    title: "Error page",
  });
};

module.exports = { notFoundHandler, errorHnadler };
