const express = require("express");
const router = express.Router();
const {
  createMeeting,
  getMeetingInfo,
} = require("../controllers/meetingController");

router.get("/", getMeetingInfo);
router.post("/", createMeeting);

module.exports = router;
