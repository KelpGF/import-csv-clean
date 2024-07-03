import request from "supertest";
import { setUpApp } from "../configs/app";

describe("Upload route", () => {
  test("Should return 200 on up", async () => {
    await request(setUpApp())
      .post("/upload")
      .attach("file", "input-test.csv")
      .expect(200);
  });

  test("Should return 400 if no file is uploaded", async () => {
    await request(setUpApp()).post("/upload").expect(400);
  });
});
