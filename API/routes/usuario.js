import { Router } from "express";
import { authentication } from "../middleware/auth.middleware.js";
import UsuarioController from "../controllers/Usuario.js";

const router = Router();

router.get("/", UsuarioController.getUsuarios);
router.get("/:id", UsuarioController.getUsuarioById);

router.get("/auth/validate", authentication, (req, res)=>{
    res.json({
        msg: "Token válido!",
        user: req.user
    })
})

router.post("/", UsuarioController.addUsuario);
router.post("/login", UsuarioController.login);


router.put("/:id", UsuarioController.updateUsuario);

router.delete("/:id", UsuarioController.deleteUsuario);

export default router;
