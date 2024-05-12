const connectDb = require("../configs/db");

const meetingSchemas = {
  //Figure out the timezone
  createMeeting: (meetingInfo, callback) => {
    const query = "INSERT INTO meetings (m_time) VALUES (?)";
    const values = [meetingInfo];
    connectDb.query(query, values, callback);
  },
  getMeetingInfo: (callback) => {
    connectDb.query("SELECT * FROM meetings", callback);
  },
};

module.exports = meetingSchemas;
