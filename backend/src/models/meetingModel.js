const connectDb = require("../configs/db");

const meetingSchemas = {
  //Figure out the timezone
  createMeeting: (meetingInfo, callback) => {
    connectDb.query(
      `INSERT INTO meetings (m_time) VALUES ('${meetingInfo}')`,
      callback
    );
  },
  getMeetingInfo: (callback) => {
    connectDb.query("SELECT * FROM meetings", callback);
  },
};

module.exports = meetingSchemas;
