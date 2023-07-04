import express from "express";
import { readFile, writeFile } from "fs/promises";
import morgan from "morgan";
import apiRouter from "./api.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* routes */
app.use("/api", apiRouter);

app.get("/", async (req, res) => {
  const data = await readFile("data.txt", "utf-8");

  res.status(200).send({ message: "ok", response: data });
});

app.get("/:name", (req, res) => {
  const name = req.params.name;

  res.status(200).json({ params: name });
});

app.post("/", async (req, res) => {
  const post = req.body.message;

  await writeFile("data.txt", post, "utf-8");

  const data = await readFile("data.txt", "utf-8");
  res.status(200).send({ message: "ok", response: data });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
