import express from "express";
import { readFile, writeFile } from "fs/promises";
import morgan from "morgan";
import apiRouter from "./api.js";
import db from "../db.json";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "get request" });
});

app.get("/posts", (req, res) => {
  res.status(200).json(db);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
