import express from "express";
import cors from "cors";
import "dotenv/config";

import RouterUsuario from "./routes/usuario.js";
import RouterCategoria from "./routes/categoria.js";
import RouterProduto from "./routes/produto.js";
import RouterFornecedor from "./routes/fornecedor.js";
import EnsaioRouter from "./routes/ensaio.js";

const PORT = process.env.API_PORT;
const api = express();

api.use(express.json());
api.use(cors());

api.use("/api/usuario", RouterUsuario);
api.use("/api/categoria", RouterCategoria);
api.use("/api/produto", RouterProduto);
api.use("/api/fornecedor", RouterFornecedor);
api.use("/api/ensaio", EnsaioRouter);

api.listen(PORT, () => {
  console.log(`API opened at http://localhost:${PORT}`);
});

api.get("/", (_, res) => {
  res.send("HELLO WORLD!");
});
