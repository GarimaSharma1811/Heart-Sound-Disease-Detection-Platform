import numpy as np
import joblib

from collections import Counter

from xgboost import XGBClassifier

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

# ==========================================================
# Load Features
# ==========================================================

print("=" * 60)
print("Loading Features...")
print("=" * 60)

X = np.load("X.npy")
y = np.load("y.npy")

print("Feature Shape :", X.shape)
print("Labels Shape  :", y.shape)

# ==========================================================
# Train-Test Split
# ==========================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)

print("\nTraining Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

# ==========================================================
# Handle Class Imbalance
# ==========================================================

counter = Counter(y_train)

print("\nTraining Class Distribution:")
print(counter)

scale_pos_weight = counter[0] / counter[1]

print(f"\nScale Pos Weight : {scale_pos_weight:.2f}")

# ==========================================================
# Build XGBoost Model
# ==========================================================

model = XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    scale_pos_weight=scale_pos_weight,
    random_state=42,
    eval_metric="logloss",
)

print("\nTraining Model...")
model.fit(X_train, y_train)

print("Training Completed!")

# ==========================================================
# Predict Probabilities
# ==========================================================

y_prob = model.predict_proba(X_test)[:, 1]

# ==========================================================
# Threshold Search
# ==========================================================

thresholds = [0.30, 0.35, 0.40, 0.45, 0.50]

print("\n" + "=" * 80)
print("THRESHOLD COMPARISON")
print("=" * 80)

best_threshold = None
best_f1 = -1

for threshold in thresholds:

    y_pred = (y_prob >= threshold).astype(int)

    report = classification_report(
        y_test,
        y_pred,
        output_dict=True,
        zero_division=0,
    )

    accuracy = accuracy_score(y_test, y_pred)

    precision = report["1"]["precision"]
    recall = report["1"]["recall"]
    f1 = report["1"]["f1-score"]

    print(
        f"Threshold={threshold:.2f} | "
        f"Accuracy={accuracy:.4f} | "
        f"Precision={precision:.4f} | "
        f"Recall={recall:.4f} | "
        f"F1={f1:.4f}"
    )

    if f1 > best_f1:
        best_f1 = f1
        best_threshold = threshold

print("\n" + "=" * 80)
print(f"Best Threshold : {best_threshold}")
print("=" * 80)

# ==========================================================
# Final Prediction Using Best Threshold
# ==========================================================

y_pred = (y_prob >= best_threshold).astype(int)

accuracy = accuracy_score(y_test, y_pred)

print("\n" + "=" * 60)
print("FINAL MODEL PERFORMANCE")
print("=" * 60)

print(f"Accuracy : {accuracy:.4f}")

print("\nClassification Report\n")
print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0,
    )
)

print("\nConfusion Matrix\n")
print(confusion_matrix(y_test, y_pred))

# ==========================================
# Save Model + Threshold
# ==========================================

joblib.dump(
    {
        "model": model,
        "threshold": best_threshold,
    },
    "models/heart_model.pkl",
)

print("\n" + "=" * 60)
print("Model Saved Successfully!")
print("Location : models/heart_model.pkl")
print(f"Threshold Saved : {best_threshold}")
print("=" * 60)