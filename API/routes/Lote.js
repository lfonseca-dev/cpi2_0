import { Router } from "express";
import LoteController from "../controllers/Lote.js";

const router = Router();

router.get("/", LoteController.getLotes);
router.get("/:id", LoteController.getLoteById);
router.get("/numero/:numero", LoteController.getLoteByNum);
router.post("/", LoteController.addLote);
router.put("/:id", LoteController.updateLote);
router.delete("/:id", LoteController.deleteLote);

export default router;