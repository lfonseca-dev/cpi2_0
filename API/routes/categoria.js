import { Router } from "express";
import CategoriaController from "../controllers/Categoria.js";

const router = Router();

router.get("/", CategoriaController.getAllCategorias);
router.get("/:id", CategoriaController.getCategoriaById);
router.get("/descricao/:descricao", CategoriaController.getCategoriaByDesc);

router.post("/", CategoriaController.addCategoria);

router.put("/:id", CategoriaController.updateCategoria);

router.delete("/:id", CategoriaController.deleteCategoria);

export default router;
