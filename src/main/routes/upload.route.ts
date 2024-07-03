import { ProcessFileService } from "@/domain/services/process-file.service.interface";
import { Router } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

export default (
  router: Router,
  processFileService: ProcessFileService,
): void => {
  router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const filename = req.file.filename;
    await processFileService.processFile(filename);

    res.json({ message: "File uploaded successfully!" });
  });
};
