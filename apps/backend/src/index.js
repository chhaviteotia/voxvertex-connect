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
    app.use("/api/conversations", require("./routes/conversations"));
    app.use("/api/business/settings", require("./routes/businessSettings"));
    app.use("/api/business/requirements", require("./routes/requirements"));
    app.use("/api/business/calendar", require("./routes/businessCalendar"));
    app.use("/api/expert/profile", require("./routes/expertProfile"));
    app.use("/api/expert/proposals", require("./routes/expertProposals"));
    app.use("/api/expert/calendar", require("./routes/expertCalendar"));
    app.use("/api/expert/opportunities", require("./routes/expertOpportunities"));

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
