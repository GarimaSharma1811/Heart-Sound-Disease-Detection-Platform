<div align="center">

# Heart Sound Disease Detection Platform

### AI-Powered Heart Sound Disease Detection using React, Node.js, Express, MongoDB, Flask, and XGBoost

A full-stack healthcare application that analyzes phonocardiogram (PCG) recordings to classify heart sounds as **Normal** or **Abnormal** using a machine learning model. The platform provides secure authentication, patient history management, signal visualizations, and downloadable PDF medical reports.

</div>

---

## Overview

Heart Sound Disease Detection Platform is a full-stack AI-powered web application developed to assist in the analysis of heart sound recordings.

Users can securely upload heart sound recordings (.wav), obtain automated predictions from a trained XGBoost model, visualize important signal representations, maintain prediction history, and generate professional PDF medical reports.

---

## Features

- Secure JWT Authentication
- User Registration and Login
- Upload Heart Sound (.wav) Recordings
- AI-Based Heart Sound Classification
- Confidence Score and Class Probabilities
- Waveform Visualization
- Spectrogram Generation
- Mel Spectrogram Visualization
- MFCC Feature Visualization
- Patient Prediction History
- Search Previous Predictions
- Download PDF Medical Reports
- MongoDB Integration

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- React Icons
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- PDFKit

### Machine Learning

- Python
- Flask
- XGBoost
- Librosa
- NumPy
- Matplotlib

---

## Workflow

1. User logs into the application.
2. Patient information is entered.
3. A heart sound (.wav) recording is uploaded.
4. The backend sends the recording to the Flask machine learning service.
5. The trained XGBoost model predicts whether the recording is **Normal** or **Abnormal**.
6. Waveform, Spectrogram, Mel Spectrogram, and MFCC visualizations are generated.
7. Prediction details are stored in MongoDB.
8. Users can review previous predictions through the History page.
9. A professional PDF medical report can be downloaded for every prediction.

---

## Application Screenshots

### Landing Page

![Landing Page](assets/screenshots/landing.png)

---

### Login Page

![Login](assets/screenshots/login.png)

---

### Upload Heart Sound

![Upload](assets/screenshots/upload.png)

---

### Prediction Result

![Prediction Result](assets/screenshots/result.png)

---

### Signal Visualizations

![Signal Visualizations](assets/screenshots/visualization.png)

---

### Prediction History

![Prediction History](assets/screenshots/history.png)

---

### PDF Medical Report

![PDF Report](assets/screenshots/report.png)

---

## Project Structure

```text
Heart-Sound-Disease-Detection-Platform
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── utils
│   └── src
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
├── ml
│   ├── app.py
│   ├── predict.py
│   ├── generated
│   ├── models
│   └── requirements.txt
│
├── assets
│   └── screenshots
│
├── README.md
├── package.json
└── .gitignore
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/GarimaSharma1811/Heart-Sound-Disease-Detection-Platform.git
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Machine Learning Dependencies

```bash
cd ml
pip install -r requirements.txt
```

---

## Run the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

### Start Flask Server

```bash
cd ml
python app.py
```

---

## Future Improvements

- Multi-class heart disease classification
- Doctor dashboard
- Cloud deployment
- Email PDF reports
- Patient analytics dashboard
- Real-time heart sound streaming

---

## Author

**Garima**

B.Tech Computer Science Engineering

Thapar Institute of Engineering and Technology

GitHub: https://github.com/GarimaSharma1811
