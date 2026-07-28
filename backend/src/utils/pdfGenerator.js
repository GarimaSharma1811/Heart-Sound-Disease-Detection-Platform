const PDFDocument = require("pdfkit");
const axios = require("axios");

async function addImage(doc, title, imageUrl) {
  if (!imageUrl) return;

  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    if (doc.y > 650) {
      doc.addPage();
    }

    doc
      .fontSize(16)
      .fillColor("#1f2937")
      .text(title);

    doc.moveDown(0.5);

    doc.image(Buffer.from(response.data), {
      fit: [450, 250],
      align: "center",
    });

    doc.moveDown();
  } catch (err) {
    doc
      .fillColor("red")
      .fontSize(11)
      .text(`Unable to load ${title}`);
    doc.moveDown();
  }
}

const generateReport = async (prediction, res) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Heart_Report_${prediction.patientName}.pdf`
  );

  doc.pipe(res);

  doc
    .fontSize(24)
    .fillColor("#2563eb")
    .text(
      "Heart Sound Disease Detection Report",
      {
        align: "center",
      }
    );

  doc.moveDown();

  doc
    .fontSize(12)
    .fillColor("black");

  doc.text(`Patient Name : ${prediction.patientName}`);
  doc.text(`Age : ${prediction.age}`);
  doc.text(`Gender : ${prediction.gender}`);
  doc.text(`Audio File : ${prediction.filename}`);

  doc.moveDown();

  doc
    .fontSize(16)
    .fillColor(
      prediction.prediction === "Normal"
        ? "green"
        : "red"
    )
    .text(
      `Prediction : ${prediction.prediction}`
    );

  doc
    .fillColor("black")
    .fontSize(12);

  doc.text(
    `Confidence : ${prediction.confidence.toFixed(2)} %`
  );

  doc.text(
    `Normal Probability : ${prediction.probabilities.normal.toFixed(
      2
    )} %`
  );

  doc.text(
    `Abnormal Probability : ${prediction.probabilities.abnormal.toFixed(
      2
    )} %`
  );

  doc.text(
    `Sample Rate : ${prediction.sampleRate} Hz`
  );

  doc.text(
    `Duration : ${prediction.duration} sec`
  );

  doc.text(
    `Generated : ${new Date(
      prediction.createdAt
    ).toLocaleString()}`
  );

  doc.moveDown();

  await addImage(
    doc,
    "Waveform",
    prediction.waveform
  );

  await addImage(
    doc,
    "Spectrogram",
    prediction.spectrogram
  );

  await addImage(
    doc,
    "Mel Spectrogram",
    prediction.melSpectrogram
  );

  await addImage(
    doc,
    "MFCC",
    prediction.mfcc
  );

  doc.moveDown();

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      "This report is generated using an AI-based Heart Sound Disease Detection System. Clinical diagnosis should always be confirmed by a qualified medical professional.",
      {
        align: "justify",
      }
    );

  doc.end();
};

module.exports = generateReport;