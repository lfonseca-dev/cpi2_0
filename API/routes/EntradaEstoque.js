import { Router } from "express";
import EntradaEstoqueController from "../controllers/EntradaEstoque.js";

const router = Router();

router.get("/", EntradaEstoqueController.getEntradasEstoque);
router.get("/:id", EntradaEstoqueController.getEntradaEstoqueById);
router.post("/", EntradaEstoqueController.addEntradaEstoque);
router.put("/:id", EntradaEstoqueController.updateEntradaEstoque);
router.delete("/:id", EntradaEstoqueController.deleteEntradaEstoque);

export default router;