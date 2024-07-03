import request from "supertest";
import { setUpApp } from "../configs/app";

describe("Upload route", () => {
  test("Should return 200 on up", async () => {
    await request(setUpApp())
      .post("/upload")
      .attach("file", "csv-files/input-test.csv")
      .expect(200);
  });

  test("Should return 200 and with execution time lower than 1 minute", async () => {
    const startDate = Date.now();

    const response = await request(setUpApp())
      .post("/upload")
      .attach("file", "csv-files/input.csv")
      .expect(200);

    const endDate = Date.now();

    expect(response.body.message).toBe(
      "File uploaded successfully! We are processing the data",
    );
    expect(endDate - startDate).toBeLessThan(60000);
  }, 60000);

  test("Should return 400 if no file is uploaded", async () => {
    await request(setUpApp()).post("/upload").expect(400);
  });
});
