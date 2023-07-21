import express from "express";
import cors from "cors";
import pollRoute from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(pollRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

