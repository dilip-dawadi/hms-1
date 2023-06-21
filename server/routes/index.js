import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
const InitialRoute = (app) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const buildPath = path.join(__dirname, "../Utils/build");
  app.use(express.static(buildPath));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
};
export default InitialRoute;
