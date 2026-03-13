import express from 'express';
import cors from 'cors';
import express from "express";
import cors from "cors";
import "dotenv/config";

import RouterUsuario from "./routes/usuario.js";
import RouterCategoria from "./routes/categoria.js";
import RouterProduto from "./routes/produto.js";
import RouterFornecedor from "./routes/fornecedor.js";
import EnsaioRouter from "./routes/ensaio.js";

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

api.use("/api/usuario", RouterUsuario);
api.use("/api/categoria", RouterCategoria);
api.use("/api/produto", RouterProduto);
api.use("/api/fornecedor", RouterFornecedor);
api.use("/api/ensaio", EnsaioRouter);

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


api.listen(PORT, () => {
  console.log(`API opened at http://localhost:${PORT}`);
});

api.get("/", (_, res) => {
  res.send("HELLO WORLD!");
});

