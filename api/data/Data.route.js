const express = require("express");
const dataController = require("./Data.controller");

const router = express.Router();

router.get("/scrapData", dataController.scrapData);

// router.get("/copyDataFromOtherAPI", dataController.copyDataFromOtherAPI);

router.get("/", dataController.getData);

// router.delete("/:_id/", dataController.deleteData);

module.exports = router;
