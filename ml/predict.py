import os
import uuid
import joblib
import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

from feature_extraction import extract_features

OUTPUT_FOLDER = "generated"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

saved = joblib.load("models/heart_model.pkl")

model = saved["model"]
threshold = saved["threshold"]

print("Model Loaded Successfully!")
print(f"Using Threshold : {threshold}")


def save_waveform(signal, sr, filename):

    plt.figure(figsize=(12, 3))

    librosa.display.waveshow(
        signal,
        sr=sr,
        color="royalblue"
    )

    plt.title("PCG Waveform")

    plt.xlabel("Time (s)")

    plt.ylabel("Amplitude")

    plt.grid(alpha=0.3)

    plt.tight_layout()

    plt.savefig(filename, dpi=250)

    plt.close()


def save_spectrogram(signal, sr, filename):

    stft = librosa.stft(signal)

    db = librosa.amplitude_to_db(
        np.abs(stft),
        ref=np.max
    )

    plt.figure(figsize=(10, 4))

    librosa.display.specshow(
        db,
        sr=sr,
        x_axis="time",
        y_axis="hz",
        cmap="magma"
    )

    plt.colorbar()

    plt.title("Spectrogram")

    plt.tight_layout()

    plt.savefig(filename, dpi=250)

    plt.close()


def save_mel(signal, sr, filename):

    mel = librosa.feature.melspectrogram(
        y=signal,
        sr=sr,
        n_mels=128
    )

    mel_db = librosa.power_to_db(
        mel,
        ref=np.max
    )

    plt.figure(figsize=(10, 4))

    librosa.display.specshow(
        mel_db,
        sr=sr,
        x_axis="time",
        y_axis="mel",
        cmap="viridis"
    )

    plt.colorbar()

    plt.title("Mel Spectrogram")

    plt.tight_layout()

    plt.savefig(filename, dpi=250)

    plt.close()


def save_mfcc(signal, sr, filename):

    mfcc = librosa.feature.mfcc(
        y=signal,
        sr=sr,
        n_mfcc=20
    )

    plt.figure(figsize=(10, 4))

    librosa.display.specshow(
        mfcc,
        x_axis="time",
        cmap="coolwarm"
    )

    plt.colorbar()

    plt.title("MFCC")

    plt.tight_layout()

    plt.savefig(filename, dpi=250)

    plt.close()


def predict(audio_path):

    signal, sample_rate = librosa.load(
        audio_path,
        sr=4000
    )

    signal, _ = librosa.effects.trim(signal)

    duration = round(
        librosa.get_duration(
            y=signal,
            sr=sample_rate
        ),
        2
    )

    uid = str(uuid.uuid4())

    waveform_name = f"{uid}_waveform.png"
    spectrogram_name = f"{uid}_spectrogram.png"
    mel_name = f"{uid}_mel.png"
    mfcc_name = f"{uid}_mfcc.png"

    waveform_path = os.path.join(
        OUTPUT_FOLDER,
        waveform_name
    )

    spectrogram_path = os.path.join(
        OUTPUT_FOLDER,
        spectrogram_name
    )

    mel_path = os.path.join(
        OUTPUT_FOLDER,
        mel_name
    )

    mfcc_path = os.path.join(
        OUTPUT_FOLDER,
        mfcc_name
    )

    save_waveform(
        signal,
        sample_rate,
        waveform_path
    )

    save_spectrogram(
        signal,
        sample_rate,
        spectrogram_path
    )

    save_mel(
        signal,
        sample_rate,
        mel_path
    )

    save_mfcc(
        signal,
        sample_rate,
        mfcc_path
    )

    features = extract_features(audio_path)

    features = np.array(features).reshape(1, -1)

    abnormal_probability = model.predict_proba(features)[0][1]

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

            "waveform":
                waveform_name,

            "spectrogram":
                spectrogram_name,

            "mel":
                mel_name,

            "mfcc":
                mfcc_name
        }
    }


if __name__ == "__main__":

    sample = input("Enter WAV File: ")

    result = predict(sample)

    print(result)