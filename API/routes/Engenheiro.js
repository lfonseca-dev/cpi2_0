import { Router } from "express";
import EngenheiroController from "../controllers/Engenheiro.js";

const router = Router();

router.get("/", EngenheiroController.getEngenheiros);
router.get("/:id", EngenheiroController.getEngenheiroById);
router.post("/", EngenheiroController.addEngenheiro);
router.put("/:id", EngenheiroController.updateEngenheiro);
router.delete("/:id", EngenheiroController.deleteEngenheiro);

export default router;