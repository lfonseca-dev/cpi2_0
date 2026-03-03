import express from 'express';
import cors from 'cors';
import "dotenv/config";
import OperadorRouter from "./routes/Operador.js";
import EngenheiroRouter from "./routes/Engenheiro.js";

const PORT = process.env.API_PORT;
const api = express();

api.use(express.json());
api.use(cors());

api.use("/api/operador", OperadorRouter);
api.use("/api/engenheiro", EngenheiroRouter);

api.listen(PORT, ()=>{
    console.log(`API opened at http://localhost:${PORT}`);
})

api.get("/", (_, res)=>{
    res.send("HELLO WORLD!");
})