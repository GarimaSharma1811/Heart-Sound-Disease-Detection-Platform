import os

os.environ["NUMBA_DISABLE_JIT"] = "1"

import joblib
import librosa
import numpy as np

from feature_extraction import extract_features


saved = joblib.load(
    "models/heart_model.pkl"
)

model = saved["model"]
threshold = saved["threshold"]

print("Model Loaded Successfully!")
print(f"Using Threshold : {threshold}")


def predict(audio_path):

    signal, sample_rate = librosa.load(
        audio_path,
        sr=4000,
        mono=True
    )

    signal, _ = librosa.effects.trim(
        signal
    )

    if len(signal) == 0:
        raise ValueError(
            "Audio contains no usable signal."
        )

    duration = round(
        len(signal) / sample_rate,
        2
    )

    features = extract_features(
        signal,
        sample_rate
    )

    features = np.asarray(
        features,
        dtype=np.float32
    ).reshape(1, -1)

    print(
        f"Feature shape: {features.shape}"
    )

    probabilities = model.predict_proba(
        features
    )[0]

    abnormal_probability = float(
        probabilities[1]
    )

    prediction = (
        1
        if abnormal_probability >= threshold
        else 0
    )

    confidence = (
        abnormal_probability
        if prediction == 1
        else 1 - abnormal_probability
    )

    return {
        "prediction":
            "Abnormal"
            if prediction
            else "Normal",

        "confidence":
            round(
                confidence * 100,
                2
            ),

        "sampleRate":
            sample_rate,

        "duration":
            duration,

        "probabilities": {
            "normal":
                round(
                    (1 - abnormal_probability) * 100,
                    2
                ),

            "abnormal":
                round(
                    abnormal_probability * 100,
                    2
                )
        },

        "images": {
            "waveform": None,
            "spectrogram": None,
            "mel": None,
            "mfcc": None
        }
    }


if __name__ == "__main__":

    sample = input(
        "Enter WAV File: "
    )

    result = predict(sample)

    print(result)