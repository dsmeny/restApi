import express from "express";
import { readFile, writeFile } from "fs/promises";
import morgan from "morgan";
import apiRouter from "./api.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
