import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.status(200).json({ message: "api response" });
});

apiRouter.get("/:name", (req, res) => {
  const name = req.params.name;

  res.status(200).json({ params: name });
});

apiRouter.post("/", (req, res) => {
  const message = req.body.message;
  res.status(200).json({ message });
});

export default apiRouter;
