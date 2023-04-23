import express, { json } from "express";
const app = express();
import cors from "cors";
const port = 4444;
import con from "./database.js"; // Connection object to establish connection with database

import authentication from "./routes/authenticationRoutes.js";
import passenger from "./routes/passengerRoutes.js";
import conductor from "./routes/conductorRoutes.js";
import admin from "./routes/adminRoutes.js";

con.connect((error) => {
  // Connecting to database
  if (error) {
    throw error;
  } else {
    console.log("connected");
  }
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to backend")
})
app.use(json({ limit: "20mb" })); // Setting limit of data upto 20 mb

app.use("/authentication", authentication);
app.use("/passenger", passenger);
app.use("/conductor", conductor);
app.use("/admin", admin);

app.listen(port, () => {
  console.log("App listining at http://localhost:" + port);
});
