const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/tokenValidation");

const {
  createMeeting,
  getMeetingInfo,
} = require("../controllers/meetingController");

router.get("/", checkToken, getMeetingInfo);
router.post("/", checkToken, createMeeting);

module.exports = router;
