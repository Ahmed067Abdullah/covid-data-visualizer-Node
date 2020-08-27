const express = require("express");
const dataController = require("./Data.controller");

const router = express.Router();

router.get("/:_id/", dataController.getDataById);

router.get("/scrapData", dataController.scrapData);

// router.get("/copyDataFromOtherAPI", dataController.copyDataFromOtherAPI);

router.get("/", dataController.getData);

// router.delete("/:_id/", dataController.deleteData);

// router.put("/:_id/", dataController.updateData);

module.exports = router;
