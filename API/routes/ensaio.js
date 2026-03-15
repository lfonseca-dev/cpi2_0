import { Router } from "express";
import EnsaioContoller from "../controllers/Ensaio.js";

const router = Router();

router.get("/", EnsaioContoller.getAllEnsaios);
router.get("/:id", EnsaioContoller.getEnsaiobyId);
router.post("/", EnsaioContoller.addEnsaio);
router.put("/:id", EnsaioContoller.updateEnsaio);
router.delete("/:id", EnsaioContoller.deleteEnsaio);

export default router;