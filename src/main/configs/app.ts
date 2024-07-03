import express from "express";
import uploadRoute from "../routes/upload.route";
import { processFileServiceFactory } from "../factory/application/process-file.service.factory";

export function setUpApp() {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  uploadRoute(app, processFileServiceFactory());

  return app;
}
