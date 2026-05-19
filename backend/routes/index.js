// backend/routes/index.js
const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

router.use("/api", apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  router.get("/", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });

  router.use(express.static(path.resolve("../frontend/dist")));

  router.get(/^(?!\/?api).*/, (_req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html")
    );
  });
}

module.exports = router;