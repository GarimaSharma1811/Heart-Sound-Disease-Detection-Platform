# ❤️ Heart Sound Disease Detection Platform

A full-stack AI-powered web application that analyzes phonocardiogram (PCG) recordings to predict whether a patient's heart sounds are **Normal** or **Abnormal** using a trained XGBoost machine learning model.

The platform enables users to upload heart sound recordings, visualize important signal representations, securely store prediction history, and generate downloadable PDF medical reports.

---

## Demo

**Live Demo:** Coming Soon

**GitHub Repository:** https://github.com/GarimaSharma1811/Heart-Sound-Disease-Detection-Platform

---

# Features

- Secure JWT Authentication
- User Registration & Login
- Heart Sound (.wav) Upload
- AI-Based Heart Disease Prediction
- Confidence Score
- Class Probability Distribution
- Waveform Visualization
- Spectrogram Visualization
- Mel Spectrogram
- MFCC Visualization
- Patient Prediction History
- Search Previous Records
- Download Professional PDF Reports
- MongoDB Storage

---

# Tech Stack

## Frontend

- React
- React Router
- Axios
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- JWT Authentication
- PDFKit

## Machine Learning

- Python
- Flask
- XGBoost
- Librosa
- NumPy
- Matplotlib

---

# System Architecture

```
                 React Frontend
                       │
                       ▼
             Node.js + Express API
               │               │
               │               ▼
               │           MongoDB
               │
               ▼
          Flask ML Service
               │
               ▼
         XGBoost Prediction
```

---

# Workflow

1. User logs into the application.
2. Patient details are entered.
3. A heart sound recording (.wav) is uploaded.
4. The backend sends the audio to the Flask ML service.
5. The trained XGBoost model predicts the outcome.
6. Signal visualizations are generated.
7. Results are stored in MongoDB.
8. Users can review previous predictions.
9. A PDF medical report can be downloaded.

---

# Project Screenshots

## Login Page

_Add screenshot_

---

## Upload Page

_Add screenshot_

---

## Prediction Result

_Add screenshot_

---

## Prediction History

_Add screenshot_

---

## PDF Report

_Add screenshot_

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/GarimaSharma1811/Heart-Sound-Disease-Detection-Platform.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Machine Learning Server

```bash
cd ml
pip install -r requirements.txt
python app.py
```

---

# Folder Structure

```
Heart-Sound-Disease-Detection-Platform
│
├── backend
├── frontend
├── ml
├── README.md
└── .gitignore
```

---

# Future Enhancements

- Multi-class heart disease classification
- Doctor Dashboard
- Cloud Deployment
- Email PDF Reports
- Patient Analytics Dashboard
- Real-time Heart Sound Streaming

---

# Author

**Garima Sharma**

B.Tech Computer Science Engineering

Thapar Institute of Engineering and Technology

GitHub: https://github.com/GarimaSharma1811
