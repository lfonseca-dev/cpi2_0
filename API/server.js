import express from 'express';
import cors from 'cors';
import "dotenv/config";

import OperadorRouter from "./routes/operador.js";
import EngenheiroRouter from "./routes/engenheiro.js";
import DestinoRouter from "./routes/destino.js"; 
import EstoqueRouter from "./routes/estoque.js";
import ResponsavelRouter from "./routes/resposavel.js";
import NotaFiscalRouter from "./routes/notaFiscal.js";
import EntradaEstoqueRouter from "./routes/entradaEstoque.js";
import LoteRouter from "./routes/lote.js";

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