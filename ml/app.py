from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid

from predict import predict


app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@app.route("/")
def home():

    return jsonify({
        "success": True,
        "message": "Heart Sound AI API is Running"
    })


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

    filename = (
        str(uuid.uuid4())
        + ".wav"
    )

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    audio.save(filepath)

    try:

        result = predict(
            filepath
        )

        if os.path.exists(filepath):
            os.remove(filepath)

        return jsonify({
            "success": True,
            "result": result
        })

    except Exception as e:

        if os.path.exists(filepath):
            os.remove(filepath)

        print(
            f"Prediction error: {e}"
        )

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=int(
            os.environ.get(
                "PORT",
                5001
            )
        ),
        debug=False
    )