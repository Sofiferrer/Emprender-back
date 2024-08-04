import express, { json } from "express";
import cors from "cors";
import suppliesRouter from "./routes/supplies-routes";
import usersRouter from "./routes/users-routes";

export const app = express();
const PORT = 8080;

app.use(cors());
app.use(json());
app.use("/api/supplies", suppliesRouter);
app.use("/api/users", usersRouter);

// app.get("/", (request: any, response) => {
//   response.status(200).json({ message: "soy la raíz" });
// });

// app.get("/api", (request: any, response) => {
//   console.log(usersDb, suppliesDb);
// });

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
