/* fetchFare.js is used to create an end point for passenger to get the fare of selected stations*/

import { Router } from "express";
const router = Router();

// Middlewares used to geneate fare
import fetchloc from "../../middleware/fetchLoc.js";
import findDistance from "../../middleware/findDistance.js";

router.use(fetchloc, findDistance);

router.post("/", async (req, res) => {
  let success = true;
  let amount = 0;
  try {

    if (req.dist >= 0 && req.dist <= 2) {
      amount = 4;
    } else if (req.dist >= 3 && req.dist <= 5) {
      amount = 6;
    } else if (req.dist >= 6 && req.dist <= 8) {
      amount = 8;
    } else if (req.dist >= 9 && req.dist <= 11) {
      amount = 10;
    } else if (req.dist >= 12 && req.dist <= 14) {
      amount = 12;
    } else if (req.dist >= 15 && req.dist <= 18) {
      amount = 16;
    } else if (req.dist >= 19 && req.dist <= 24) {
      amount = 20;
    } else if (req.dist >= 25 && req.dist <= 50) {
      amount = 24;
    }
    res.json({ success, amount });

  } catch (error) {
    success = false;
    res.json({ success })
  }
});

export default router;
