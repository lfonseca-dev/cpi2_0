import { Router } from "express";
import ResponsavelController from "../controllers/Resposavel.js";

const router = Router();

router.get("/", ResponsavelController.getResponsaveis);
router.get("/:id", ResponsavelController.getResponsavelById);
router.get("/nome/:nome", ResponsavelController.getResponsavelByName);
router.post("/", ResponsavelController.addResponsavel);
router.put("/:id", ResponsavelController.updateResponsavel);
router.delete("/:id", ResponsavelController.deleteResponsavel);

export default router;