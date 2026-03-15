import express from 'express';
import cors from "cors";
import "dotenv/config";

import RouterUsuario from "./routes/usuario.js";
import RouterCategoria from "./routes/categoria.js";
import RouterProduto from "./routes/produto.js";
import RouterFornecedor from "./routes/fornecedor.js";
import EnsaioRouter from "./routes/ensaio.js";
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

api.listen(PORT, () => {
  console.log(`API opened at http://localhost:${PORT}`);
});

api.get("/", (_, res) => {
  res.send("HELLO WORLD!");
});