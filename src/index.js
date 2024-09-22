import express from "express";
import router from "./routes/routes.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "public", "uploads"))
);
app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
