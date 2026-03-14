import { Router } from "express";
import NotaFiscalController from "../controllers/NotaFiscal.js";

const router = Router();

router.get("/", NotaFiscalController.getAllNotasFiscais);
router.get("/:codigo", NotaFiscalController.getNotaFiscalByCod);

router.post("/", NotaFiscalController.addNotaFiscal);

router.put("/:codigo", NotaFiscalController.updateNotaFiscal);

router.delete("/:codigo", NotaFiscalController.deleteNotaFiscal);

export default router;