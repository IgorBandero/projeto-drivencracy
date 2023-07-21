import express from "express";
import cors from "cors";
import pollRoute from "./routes/routes.js";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
app.use(pollRoute);
dotenv.config()

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`));
