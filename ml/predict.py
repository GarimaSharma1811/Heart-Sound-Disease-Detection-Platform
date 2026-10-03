import os

os.environ.pop("NUMBA_DISABLE_JIT", None)
os.environ.setdefault("NUMBA_CACHE_DIR", "/tmp/numba_cache")

import base64
import io
import joblib
import librosa
import librosa.display
import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np

from feature_extraction import extract_features


MODEL_PATH = "models/heart_model.pkl"

saved = joblib.load(MODEL_PATH)

model = saved["model"]
threshold = saved["threshold"]

print("Model Loaded Successfully!")
print(f"Using Threshold : {threshold}")
print("predict.py v4 loaded")
print("NUMBA_DISABLE_JIT:", os.environ.get("NUMBA_DISABLE_JIT"))
print("NUMBA_CACHE_DIR:", os.environ.get("NUMBA_CACHE_DIR"))


try:
    print("Warming up...")
    warmup_time = np.arange(8000, dtype=np.float32) / 4000
    warmup_signal = (
        0.5 * np.sin(2 * np.pi * 50 * warmup_time)
        + 0.05 * np.random.default_rng(0).standard_normal(8000)
    ).astype(np.float32)

    librosa.effects.trim(warmup_signal)
    extract_features(warmup_signal, 4000)

    print("Warm-up complete.")

except Exception as e:
    print(f"Warm-up failed: {e}")


VIZ_N_FFT = 256
VIZ_HOP = 64


def _fig_to_base64(fig):
    buffer = io.BytesIO()

    fig.savefig(
        buffer,
        format="png",
        dpi=100,
        bbox_inches="tight"
    )

    plt.close(fig)

    buffer.seek(0)

    encoded = base64.b64encode(
        buffer.read()
    ).decode("utf-8")

    return f"data:image/png;base64,{encoded}"


def generate_visualizations(signal, sample_rate):
    images = {}

    fig, ax = plt.subplots(figsize=(8, 3))

    times = np.arange(len(signal)) / sample_rate

    ax.plot(
        times,
        signal,
        linewidth=0.6
    )

    ax.set_title("Waveform")
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Amplitude")

    images["waveform"] = _fig_to_base64(fig)

    stft = np.abs(
        librosa.stft(
            signal,
            n_fft=VIZ_N_FFT,
            hop_length=VIZ_HOP
        )
    )

    spec_db = librosa.amplitude_to_db(
        stft,
        ref=np.max
    )

    fig, ax = plt.subplots(figsize=(8, 3))

    img = librosa.display.specshow(
        spec_db,
        sr=sample_rate,
        hop_length=VIZ_HOP,
        x_axis="time",
        y_axis="hz",
        ax=ax
    )

    fig.colorbar(
        img,
        ax=ax,
        format="%+2.0f dB"
    )

    ax.set_title("Spectrogram")

    images["spectrogram"] = _fig_to_base64(fig)

    mel = librosa.feature.melspectrogram(
        y=signal,
        sr=sample_rate,
        n_fft=VIZ_N_FFT,
        hop_length=VIZ_HOP,
        n_mels=40
    )

    mel_db = librosa.power_to_db(
        mel,
        ref=np.max
    )

    fig, ax = plt.subplots(figsize=(8, 3))

    img = librosa.display.specshow(
        mel_db,
        sr=sample_rate,
        hop_length=VIZ_HOP,
        x_axis="time",
        y_axis="mel",
        ax=ax
    )

    fig.colorbar(
        img,
        ax=ax,
        format="%+2.0f dB"
    )

    ax.set_title("Mel Spectrogram")

    images["mel"] = _fig_to_base64(fig)

    mfcc = librosa.feature.mfcc(
        y=signal,
        sr=sample_rate,
        n_mfcc=20,
        n_fft=VIZ_N_FFT,
        hop_length=VIZ_HOP,
        n_mels=40
    )

    fig, ax = plt.subplots(figsize=(8, 3))

    img = librosa.display.specshow(
        mfcc,
        sr=sample_rate,
        hop_length=VIZ_HOP,
        x_axis="time",
        ax=ax
    )

    fig.colorbar(img, ax=ax)

    ax.set_title("MFCC")
    ax.set_ylabel("Coefficient")

    images["mfcc"] = _fig_to_base64(fig)

    return images


def predict(audio_path):
    print(f"Prediction requested for: {audio_path}")

    signal, sample_rate = librosa.load(
        audio_path,
        sr=4000,
        mono=True
    )

    signal, _ = librosa.effects.trim(signal)

    if len(signal) == 0:
        raise ValueError("Audio contains no usable signal.")

    duration = round(
        len(signal) / sample_rate,
        2
    )

    print("Extracting features...")

    features = extract_features(
        signal,
        sample_rate
    )

    features = np.asarray(
        features,
        dtype=np.float32
    ).reshape(1, -1)

    print(f"Feature shape: {features.shape}")

    probabilities = model.predict_proba(features)[0]

    abnormal_probability = float(probabilities[1])

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

    try:
        print("Generating visualizations...")

        images = generate_visualizations(
            signal,
            sample_rate
        )

        print("Visualizations generated successfully.")

    except Exception as e:
        print(f"Visualization error: {e}")

        images = {
            "waveform": None,
            "spectrogram": None,
            "mel": None,
            "mfcc": None
        }

    result = {
        "prediction": "Abnormal" if prediction else "Normal",
        "confidence": round(
            confidence * 100,
            2
        ),
        "sampleRate": sample_rate,
        "duration": duration,
        "probabilities": {
            "normal": round(
                (1 - abnormal_probability) * 100,
                2
            ),
            "abnormal": round(
                abnormal_probability * 100,
                2
            )
        },
        "images": images
    }

    print("Prediction completed successfully.")

    return result


if __name__ == "__main__":
    sample = input("Enter WAV File: ")

    result = predict(sample)

    print({
        k: v
        for k, v in result.items()
        if k != "images"
    })