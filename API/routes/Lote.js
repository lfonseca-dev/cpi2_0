import { Router } from "express";
import LoteController from "../controllers/Lote.js";

const router = Router();

router.get("/", LoteController.getAllLotes);
router.get("/:id", LoteController.getLoteById);

router.post("/", LoteController.addLote);

router.put("/:id", LoteController.updateLote);

router.delete("/:id", LoteController.deleteLote);

export default router;