const Developer = require("../models/developer");

exports.getDevelopers = async (req, res) => {
  const developers = await Developer.find();

  // const developerInfo = {
  //   fullname: developer.fullname,
  //   jobdesk: developer.jobdesk,
  //   avatar: developer.avatar ? developer.avatar : "",
  // };

  return res.json({ success: true, developers: developers });
};
