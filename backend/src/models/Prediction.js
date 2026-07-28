const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    filename: {
      type: String,
      required: true,
    },

    prediction: {
      type: String,
      required: true,
      enum: ["Normal", "Abnormal"],
    },

    confidence: {
      type: Number,
      required: true,
    },

    probabilities: {
      normal: {
        type: Number,
        default: 0,
      },
      abnormal: {
        type: Number,
        default: 0,
      },
    },

    // ===============================
    // Audio Information
    // ===============================

    sampleRate: {
      type: Number,
      default: 4000,
    },

    duration: {
      type: Number,
      default: 0,
    },

    // ===============================
    // Visualization Images
    // ===============================

    waveform: {
      type: String,
      default: "",
    },

    spectrogram: {
      type: String,
      default: "",
    },

    melSpectrogram: {
      type: String,
      default: "",
    },

    mfcc: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prediction", predictionSchema);