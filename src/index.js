import express from "express";
import { readFile, writeFile } from "fs/promises";
import morgan from "morgan";
import db from "../db.json" assert { type: "json" };
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json(db);
});

app.get("/title/:id", (req, res) => {
  const id = req.params.id;
  const record = db[`${id}`];

  if (!record) {
    res.status(400).json({ error: "Bad Request" });
  }

  res.status(200).json(record);
});

app.put("/title/:id", (req, res) => {
  const id = req.params.id;
  const record = db[`${id}`];
  const query = req.query.title;

  if (!record) {
    res.status(400).json({ error: "Bad Request" });
  }

  record.title = query;

  res.status(200).json({ title: record.title });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const record = db[`${id}`];

  if (!record) {
    res.status(400).json({ error: "Bad Request" });
  }
  res.status(200).json(record);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
