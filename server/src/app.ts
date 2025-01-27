import express, { Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Load routes
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
