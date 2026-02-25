const express = require("express");
const router = express.Router();
const { isConnected } = require("../config/db");
const { env } = require("../config/env");

router.get("/", (req, res) => {
  const body = { status: "ok", db: env.DB_ADAPTER, timestamp: new Date().toISOString() };
  if (env.DB_ADAPTER === "mongodb") {
    body.mongodb = isConnected() ? "connected" : "disconnected";
  }
  res.json(body);
});

module.exports = router;
