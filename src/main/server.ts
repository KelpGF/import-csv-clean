import "module-alias/register";
import { setUpApp } from "./configs/app";

const host = process.env.HOST || "localhost";
const port = +process.env.PORT || 3000;

setUpApp().listen(port, host, 0, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
