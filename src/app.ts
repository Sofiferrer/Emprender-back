import express, { json } from "express";
import cors from "cors";
import indexRouter from "./routes";
import errorHandler from "./middlewares/error-handler";

const app = express();

// Configura CORS para permitir acceso desde tu frontend
const corsOptions = {
  origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  credentials: true, // Si necesitas compartir cookies
};

app.use(cors(corsOptions));

app.use(json());
app.use("/status", (req, res) =>
  res.json({ environment: process.env.ENVIRONMENT })
);
app.use("/", indexRouter);

app.use(errorHandler);
export default app;
