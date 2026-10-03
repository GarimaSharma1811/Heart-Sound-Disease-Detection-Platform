import librosa
import numpy as np


def extract_features(signal, sample_rate):

    features = []

    mfcc = librosa.feature.mfcc(
        y=signal,
        sr=sample_rate,
        n_mfcc=20
    )

    features.extend(np.mean(mfcc, axis=1))
    features.extend(np.std(mfcc, axis=1))

    chroma = librosa.feature.chroma_stft(
        y=signal,
        sr=sample_rate
    )

    features.extend(np.mean(chroma, axis=1))

    centroid = librosa.feature.spectral_centroid(
        y=signal,
        sr=sample_rate
    )

    features.append(np.mean(centroid))

    bandwidth = librosa.feature.spectral_bandwidth(
        y=signal,
        sr=sample_rate
    )

    features.append(np.mean(bandwidth))

    rolloff = librosa.feature.spectral_rolloff(
        y=signal,
        sr=sample_rate
    )

    features.append(np.mean(rolloff))

    zcr = librosa.feature.zero_crossing_rate(
        signal
    )

    features.append(np.mean(zcr))

    rms = librosa.feature.rms(
        y=signal
    )

    features.append(np.mean(rms))

    return np.asarray(
        features,
        dtype=np.float32
    )