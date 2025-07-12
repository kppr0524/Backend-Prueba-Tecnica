import express from "express";
import cors from "cors";
import tasksRoutes from "./routes/task";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend simulado corriendo en http://localhost:${PORT}`);
});
