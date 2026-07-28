from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

from predict import predict

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
GENERATED_FOLDER = "generated"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(GENERATED_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "Heart Sound AI API is Running"
    })


@app.route("/generated/<filename>")
def generated(filename):
    return send_from_directory(GENERATED_FOLDER, filename)


@app.route("/predict", methods=["POST"])
def predict_audio():

    if "audio" not in request.files:
        return jsonify({
            "success": False,
            "message": "No audio file uploaded."
        }), 400

    audio = request.files["audio"]

    if audio.filename == "":
        return jsonify({
            "success": False,
            "message": "No file selected."
        }), 400

    filepath = os.path.join(
        UPLOAD_FOLDER,
        audio.filename
    )

    audio.save(filepath)

    try:

        result = predict(filepath)

        if os.path.exists(filepath):
            os.remove(filepath)

        base_url = "http://127.0.0.1:5001/generated/"

        result["images"]["waveform"] = (
            base_url + result["images"]["waveform"]
        )

        result["images"]["spectrogram"] = (
            base_url + result["images"]["spectrogram"]
        )

        result["images"]["mel"] = (
            base_url + result["images"]["mel"]
        )

        result["images"]["mfcc"] = (
            base_url + result["images"]["mfcc"]
        )

        return jsonify({
            "success": True,
            "result": result
        })

    except Exception as e:

        if os.path.exists(filepath):
            os.remove(filepath)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=False,
        threaded=True
    )