import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";
import db from "./config/Database.js";
// import User from './models/User.js';
// import Note from './models/Note.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

// try {
//   await db.authenticate();
//   console.log('Database connected...');
//   await User.sync();
//   await Note.sync();
// } catch (error) {
//   console.log(error);
// }

db.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
});
