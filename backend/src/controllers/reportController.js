const Prediction = require("../models/Prediction");
const generateReport = require("../utils/pdfGenerator");

const downloadReport = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found.",
      });
    }

    await generateReport(prediction, res);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  downloadReport,
};