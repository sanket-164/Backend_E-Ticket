import { Router } from "express";
const router = Router();

import login from "./authentication/login.js";
import signup from "./authentication/signUp.js";
import sendpin from "./authentication/sendPin.js";
import changePwd from "./authentication/changePwd.js";

router.use("/logIn", login);
router.use("/signUp", signup);
router.use("/sendPin", sendpin);
router.use("/changePwd", changePwd);

export default router;