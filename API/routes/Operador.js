import { Router } from "express";
import OperadorController from "../controllers/Operador.js";

const router = Router();

router.get("/", OperadorController.getOperadores);
router.get("/:id", OperadorController.getOperadorById);
router.post("/", OperadorController.addOperador);
router.put("/:id", OperadorController.updateOperador);
router.delete("/:id", OperadorController.deleteOperador);

export default router;