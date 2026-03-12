import express from 'express';
import cors from 'cors';
import "dotenv/config";
import OperadorRouter from "./routes/Operador.js";
import EngenheiroRouter from "./routes/Engenheiro.js";
import DestinoRouter from "./routes/Destino.js"; 
import EstoqueRouter from "./routes/Estoque.js";
import ResponsavelRouter from "./routes/Resposavel.js";
import NotaFiscalRouter from "./routes/NotaFiscal.js";
import EntradaEstoqueRouter from "./routes/EntradaEstoque.js";
import LoteRouter from "./routes/Lote.js";

const PORT = process.env.API_PORT;
const api = express();

api.use(express.json());
api.use(cors());

api.use("/api/operador", OperadorRouter);
api.use("/api/engenheiro", EngenheiroRouter);
api.use("/api/destino", DestinoRouter);
api.use("/api/estoque", EstoqueRouter);
api.use("/api/responsavel", ResponsavelRouter);
api.use("/api/notafiscal", NotaFiscalRouter);
api.use("/api/entradaestoque", EntradaEstoqueRouter);
api.use("/api/lote", LoteRouter);

api.listen(PORT, ()=>{
    console.log(`API opened at http://localhost:${PORT}`);
})

api.get("/", (_, res)=>{
    res.send("HELLO WORLD!");
});