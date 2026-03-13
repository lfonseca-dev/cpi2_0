import { Router } from "express";
import FornecedorController from "../controllers/Fornecedor.js";

const router = Router();

router.get("/", FornecedorController.getAllFornecedores);
router.get("/:id", FornecedorController.getFornecedorById);
router.get("/nome/:nome", FornecedorController.getFornecedorByNome);

router.post("/", FornecedorController.addFornecedor);

router.put("/:id", FornecedorController.updateFornecedor);

router.delete("/:id", FornecedorController.deleteFornecedor);

export default router;
