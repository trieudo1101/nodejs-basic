import express from "express";
import path from "path";

const configViewEngine = (app) => {
  app.set("views", path.join(__dirname, "../templates/views"));
  app.set("view engine", "ejs");
  app.locals.layout = "main";
  app.use(express.static(path.join(__dirname, "../public")));
};

export default configViewEngine;
