import express from "express";
import cors from "cors";
import { route } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(3000, () => {
    console.log("O Servidor está vivo!")
});