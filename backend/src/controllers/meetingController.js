const connectDb = require("../configs/db");
const meetingSchemas = require("../models/meetingModel");

connectDb;

const createMeeting = (req, res) => {
  const meetingInfo = req.body.m_time;

  meetingSchemas.createMeeting(meetingInfo, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(`Meeting Created For ${meetingInfo}`);
  });
};

const getMeetingInfo = (req, res) => {
  meetingSchemas.getMeetingInfo((err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
      console.log(err);
      return;
    }
    res.json(result);
  });
};

module.exports = { createMeeting, getMeetingInfo };
