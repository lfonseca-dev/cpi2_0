import { Router } from "express";
import UsuarioController from "../controllers/Usuario.js";

const router = Router();

router.get("/", UsuarioController.getUsuarios);
router.get("/:id", UsuarioController.getUsuarioById);

router.post("/", UsuarioController.addUsuario);

router.put("/:id", UsuarioController.updateUsuario);

router.delete("/:id", UsuarioController.deleteUsuario);

export default router;
