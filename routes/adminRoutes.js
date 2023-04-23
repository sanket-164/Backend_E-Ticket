import { Router } from "express";
const router = Router();

import fetchuser from './middleware/fetchUser.js';
import checkAdmin from './middleware/checkAdmin.js';

router.use(fetchuser,checkAdmin);

import fetchAdmin from "./admin/fetchAdmin.js";
import update from "./admin/updateAdmin.js";
import updateImage from "./admin/updateImage.js";

import createAdmin from "./admin/forAdmins/createAdmin.js";
import updateAdmin from "./admin/forAdmins/updateAdmin.js";
import deleteAdmin from "./admin/forAdmins/deleteAdmin.js";

import createConductor from "./admin/forConductors/createConductor.js";
import updateConductor from "./admin/forConductors/updateConductor.js";
import deleteConductor from "./admin/forConductors/deleteConductor.js";

import addStation from "./admin/forStations/addStation.js";
import updateStation from "./admin/forStations/updateStation.js";
import deleteStation from "./admin/forStations/deleteStation.js";

import fetchAllAdmins from "./admin/fetchSystemData/allAdmins.js";
import fetchAllPassengers from "./admin/fetchSystemData/allPassengers.js";
import fetchAllConductors from "./admin/fetchSystemData/allConductors.js";
import fetchAllPayments from "./admin/fetchSystemData/allPayments.js";
import fetchAllTickets from "./admin/fetchSystemData/allTickets.js";
import fetchAllStations from "./admin/fetchSystemData/allStations.js";
import fetchFeedback from "./admin/fetchFeedback.js";
import replyFeedback from "./admin/replyFeedback.js";

import dailyPayment from "./admin/fetchSystemData/dailyPayment.js";
import dailyTicket from "./admin/fetchSystemData/dailyTicket.js";

import fetchPassenger from "./admin/forPassengers/fetchPassenger.js";
import fetchPaymentP from "./admin/forPassengers/fetchPayment.js";
import fetchTicket from "./admin/forPassengers/fetchTicket.js";
import updatePassenger from "./admin/forPassengers/updatePassenger.js";
import deletePassenger from "./admin/forPassengers/deletePassenger.js";

import fetchConductor from "./admin/forConductors/fetchConductor.js";
import fetchPaymentC from "./admin/forConductors/fetchPayment.js";

router.use('/fetch', fetchAdmin);
router.use('/update', update);
router.use('/updateImage', updateImage);

router.use('/addStation', addStation);
router.use('/updateStation', updateStation);
router.use('/deleteStation', deleteStation);

router.use('/createAdmin', createAdmin);
router.use('/updateAdmin', updateAdmin);
router.use('/deleteAdmin', deleteAdmin);

router.use('/createConductor', createConductor);
router.use('/updateConductor', updateConductor);
router.use('/deleteConductor', deleteConductor);

router.use("/fetchAllAdmins", fetchAllAdmins);
router.use("/fetchAllPassengers", fetchAllPassengers);
router.use("/fetchAllConductors", fetchAllConductors);
router.use("/fetchAllPayments", fetchAllPayments);
router.use("/fetchAllTickets", fetchAllTickets);
router.use("/fetchAllStations", fetchAllStations);
router.use("/fetchFeedback", fetchFeedback);
router.use("/reply", replyFeedback);

router.use('/dailyPayment', dailyPayment);
router.use('/dailyTicket', dailyTicket);

router.use("/passenger/fetch", fetchPassenger);
router.use("/passenger/fetchPayment", fetchPaymentP);
router.use("/passenger/fetchTicket", fetchTicket);
router.use("/passenger/update",updatePassenger);
router.use("/passenger/delete",deletePassenger);

router.use("/conductor/fetch", fetchConductor);
router.use("/conductor/fetchPayment", fetchPaymentC);

export default router;