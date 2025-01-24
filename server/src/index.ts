import express, { Request, Response } from "express";
import routes from "./routes";
var cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Load routes
app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
