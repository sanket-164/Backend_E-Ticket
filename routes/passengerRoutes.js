import { Router } from "express";
const router = Router();

import fetchuser from "./middleware/fetchUser.js";
import checkPassenger from "./middleware/checkPassenger.js";

router.use(fetchuser, checkPassenger);

import changePassenger from "./passenger/updatePassenger.js";
import changeImage from "./passenger/updateImage.js";
import fetchPassenger from "./passenger/fetchPassenger.js";
import fetchPayment from "./passenger/fetchPayment.js";
import submitFeedback from "./passenger/submitFeedback.js";

import createTicket from "./passenger/forTicket/purchaseTicket.js";
import fetchTicket from "./passenger/fetchTicket.js";
import cancelTicket from "./passenger/forTicket/cancelTicket.js";
import fetchActiveTicket from "./passenger/forTicket/fetchActiveTicket.js";

import fetchStations from "./passenger/forTicket/fetchStations.js";
import fetchFare from "./passenger/forTicket/fetchFare.js";

router.use("/update", changePassenger);
router.use("/updateImage", changeImage);
router.use("/fetch", fetchPassenger);
router.use("/payment", fetchPayment);
router.use("/feedback", submitFeedback);

router.use("/fetchFare", fetchFare);
router.use("/fetchStations", fetchStations);
router.use("/purchaseTicket", createTicket);
router.use("/ticket", fetchTicket);
router.use("/activeTicket", fetchActiveTicket);
router.use("/cancelTicket", cancelTicket);

export default router;