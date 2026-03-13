import { Router } from "express";
import ProdutoController from "../controllers/Produto.js";

const router = Router();

router.get("/", ProdutoController.getAllProdutos);
router.get("/:id", ProdutoController.getProdutoById);
router.get("descricao/:descricao", ProdutoController.getProdutoByDesc);

router.post("/", ProdutoController.addProduto);

router.put("/:id", ProdutoController.updateProduto);

router.delete("/:id", ProdutoController.deleteProduto);

export default router;