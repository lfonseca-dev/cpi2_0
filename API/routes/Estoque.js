import { Router } from "express";
import EstoqueController from "../controllers/Estoque.js";

const router = Router();

router.get("/", EstoqueController.getAllEstoques);
router.get("/:id", EstoqueController.getEstoqueById);
router.get("/descricao/:descricao", EstoqueController.getEstoqueByName);
router.get("/status/:status", EstoqueController.getEstoqueByStatus);

router.post("/", EstoqueController.addEstoque);

router.put("/:id", EstoqueController.updateEstoque);

router.delete("/:id", EstoqueController.deleteEstoque);

export default router;