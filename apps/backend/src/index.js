const express = require("express");
const cors = require("cors");
const { env } = require("./config/env");
const { connectDB } = require("./config/db");

const app = express();
const port = env.PORT;

connectDB()
  .then(() => {
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => res.send("VoxVertex Connect API"));

    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/business/settings", require("./routes/businessSettings"));
    app.use("/api/business/requirements", require("./routes/requirements"));

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
