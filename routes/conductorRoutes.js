import { Router } from "express";
const router = Router();

import fetchuser from "./middleware/fetchUser.js";
import checkConductor from './middleware/checkConductor.js';

router.use(fetchuser, checkConductor);

import changeConductor from "./conductor/updateConductor.js";
import changeImage from "./conductor/updateImage.js";
import fetchConductor from "./conductor/fetchConductor.js";
import fetchPayment from "./conductor/fetchPayment.js";
import recharge from "./conductor/recharge.js";
import scanTicket from "./conductor/scanTicket.js";

router.use("/update", changeConductor);
router.use("/updateImage", changeImage);
router.use("/fetch", fetchConductor);
router.use("/payment", fetchPayment);
router.use("/recharge", recharge);
router.use("/scanTicket", scanTicket);

export default router;