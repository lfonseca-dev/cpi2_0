import { Router } from "express";
import DestinoController from "../controllers/Destino.js";

const router = Router();

router.get("/", DestinoController.getAllDestinos);
router.get("/:id", DestinoController.getDestinoById);
router.get("/nome/:nome", DestinoController.getDestinoByName);

router.post("/", DestinoController.addDestino);

router.put("/:id", DestinoController.updateDestino);

router.delete("/:id", DestinoController.deleteDestino);

export default router;