import express from "express";
import { writeFile } from "fs/promises";
import { v4 as idv4 } from "uuid";
import morgan from "morgan";
import db from "../db.json" assert { type: "json" };
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json(db);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const record = db[`${id}`];

  if (!record) {
    res.status(400).json({ error: "Bad Request" });
  }
  res.status(200).json(record);
});

/* title routes */
app.get("/title/:id", (req, res) => {
  const id = req.params.id;
  const record = db[`${id}`];

  if (!record) {
    res.status(400).json({ error: "Bad Request" });
  }

  res.status(200).json(record);
});

app.post("/title", async (req, res) => {
  const record = req.body;

  if (!record) {
    res.status(400).json({ error: "Bad Request" });
  }

  db[`${idv4()}`] = record;

  await writeFile("./db.json", JSON.stringify(db, null, 2));

  res.status(200).json(record);
});

app.put("/title/:id", async (req, res) => {
  const id = req.params.id;
  const record = db[`${id}`];
  const query = req.query.title;

  if (!record) {
    res.status(400).json({ error: "Bad Request" });
  }

  record.title = query;

  await writeFile("./db.json", JSON.stringify(db, null, 2));

  res.status(200).json({ title: record.title });
});

app.delete("/title/:id", async (req, res) => {
  const id = req.params.id;
  const name = `${id}`;

  if (!db[name]) {
    res.status(400).json({ error: "Bad Request" });
  }

  delete db[name];

  await writeFile("./db.json", JSON.stringify(db, null, 2));

  res.status(200).json({ title: db[name].title });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
