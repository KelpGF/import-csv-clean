import express from "express";
import uploadRoute from "../routes/upload.route";
import { processFileServiceFactory } from "../factory/application/process-file.service.factory";

export function setUpApp() {
  const app = express();
  const port = 3000;

  uploadRoute(app, processFileServiceFactory());

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
