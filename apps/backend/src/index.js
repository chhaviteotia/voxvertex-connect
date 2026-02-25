const express = require("express");
const cors = require("cors");
const { env } = require("./config/env");
const { connectDB } = require("./config/db");

const app = express();
const port = env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VoxVertex Connect API");
});

app.use("/api/health", require("./routes/health"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
