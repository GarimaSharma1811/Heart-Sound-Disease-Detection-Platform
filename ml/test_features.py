from feature_extraction import extract_features

audio_path = "sample.wav"

features = extract_features(audio_path)

print("=" * 40)
print("Feature Extraction Successful")
print("=" * 40)

print("Number of Features :", len(features))
print(features)