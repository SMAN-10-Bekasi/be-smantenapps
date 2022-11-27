const Developer = require("../models/developer");

exports.getDevelopers = async (req, res) => {
  const developers = await Developer.find();

  return res.json({ success: true, developers: developers });
};
