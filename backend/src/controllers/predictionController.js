const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const Prediction = require("../models/Prediction");

const predictHeartSound = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an audio file.",
      });
    }

    const { patientName, age, gender } = req.body;

    const audioPath = req.file.path;

    const form = new FormData();

    const fileBuffer = fs.readFileSync(audioPath);

    form.append("audio", fileBuffer, {
      filename: req.file.originalname,
      contentType: "audio/wav",
    });

    const flaskResponse = await axios.post(
      "http://127.0.0.1:5001/predict",
      form,
      {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 60000,
      }
    );

    const aiResult = flaskResponse.data.result;
    console.log(JSON.stringify(aiResult, null, 2));

    const prediction = await Prediction.create({
      user: req.user.id,
      patientName,
      age,
      gender,
      filename: req.file.originalname,

      prediction: aiResult.prediction,
      confidence: aiResult.confidence,
      probabilities: aiResult.probabilities,

      sampleRate: aiResult.sampleRate,
      duration: aiResult.duration,

      waveform: aiResult.images.waveform,
      spectrogram: aiResult.images.spectrogram,
      melSpectrogram: aiResult.images.mel,
      mfcc: aiResult.images.mfcc,
    });

    if (fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
    }

    return res.status(200).json({
      success: true,
      prediction,
    });

  } catch (error) {

    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHistory = async (req, res) => {
  try {

    const history = await Prediction.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      history,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  predictHeartSound,
  getHistory,
};