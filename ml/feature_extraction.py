import librosa
import numpy as np


def extract_features(audio_path):
    # Load audio
    signal, sample_rate = librosa.load(audio_path, sr=4000)

    # Remove silence
    signal, _ = librosa.effects.trim(signal)

    features = []

    # MFCC (20)
    mfcc = librosa.feature.mfcc(
        y=signal,
        sr=sample_rate,
        n_mfcc=20
    )

    features.extend(np.mean(mfcc, axis=1))
    features.extend(np.std(mfcc, axis=1))

    # Chroma
    chroma = librosa.feature.chroma_stft(
        y=signal,
        sr=sample_rate
    )

    features.extend(np.mean(chroma, axis=1))

    # Spectral Centroid
    centroid = librosa.feature.spectral_centroid(
        y=signal,
        sr=sample_rate
    )

    features.append(np.mean(centroid))

    # Spectral Bandwidth
    bandwidth = librosa.feature.spectral_bandwidth(
        y=signal,
        sr=sample_rate
    )

    features.append(np.mean(bandwidth))

    # Spectral Rolloff
    rolloff = librosa.feature.spectral_rolloff(
        y=signal,
        sr=sample_rate
    )

    features.append(np.mean(rolloff))

    # Zero Crossing Rate
    zcr = librosa.feature.zero_crossing_rate(signal)

    features.append(np.mean(zcr))

    # RMS Energy
    rms = librosa.feature.rms(y=signal)

    features.append(np.mean(rms))

    return np.array(features)