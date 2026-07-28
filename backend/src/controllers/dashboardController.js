const Prediction = require("../models/Prediction");

const getDashboard = async (req, res) => {
  try {
    const totalPatients = await Prediction.countDocuments({
      user: req.user.id,
    });

    const totalReports = totalPatients;

    const recentPredictions = await Prediction.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "patientName prediction confidence createdAt"
      );

    res.status(200).json({
      success: true,
      totalPatients,
      totalReports,
      recentPredictions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};