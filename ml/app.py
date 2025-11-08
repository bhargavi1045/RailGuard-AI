from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import requests
import traceback

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "my_model.h5")
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

# ================================
# 🆕 AUTO-DOWNLOAD MODEL FROM GOOGLE DRIVE
# ================================
def download_model_from_drive():
    file_id = "17AJpwFqFZRLwNUUDNwApPRK2MfXH2mlA"  
    url = f"https://drive.google.com/uc?id={file_id}"
    print("📥 Downloading model from Google Drive...")

    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        total = int(response.headers.get('content-length', 0))
        downloaded = 0
        with open(MODEL_PATH, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    done = int(50 * downloaded / total) if total else 0
                    print(f"\r[{'=' * done}{' ' * (50 - done)}] {downloaded/1e6:.2f} MB", end='')
        print("\n✅ Model downloaded successfully!")
    except Exception as e:
        print("\n❌ Failed to download model:", e)
        raise e

# Check if model exists, otherwise download it
if not os.path.exists(MODEL_PATH):
    download_model_from_drive()

# ================================
# LOAD MODEL
# ================================
try:
    model = load_model(MODEL_PATH)
    print(f"✅ Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"❌ Failed to load model from {MODEL_PATH}")
    traceback.print_exc()
    raise e

# ================================
# CONFIG
# ================================
NODE_SERVER_SECRET = os.getenv("NODE_SERVER_SECRET", "supersecretkey")
CLASS_NAMES = ['Defective', 'Non defective']

# ================================
# ROUTES
# ================================
@app.route("/uploads/<filename>")
def serve_upload(filename):
    return send_from_directory(UPLOADS_DIR, filename)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400

        # Save uploaded file
        file_path = os.path.join(UPLOADS_DIR, file.filename)
        file.save(file_path)

        # Preprocess image
        img = image.load_img(file_path, target_size=(448, 448))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        # Predict
        predictions = model.predict(img_array)
        confidence = float(np.max(predictions))
        predicted_class = CLASS_NAMES[int(np.argmax(predictions))]

        # Send alert to Node backend if defective
        if predicted_class == "Defective":
            try:
                node_api = "http://localhost:5000/api/alerts"
                alert_data = {
                    "imageUrl": f"http://127.0.0.1:5000/uploads/{file.filename}",
                    "confidence": round(confidence * 100, 2)
                }
                headers = {"x-server-secret": NODE_SERVER_SECRET}
                resp = requests.post(node_api, json=alert_data, headers=headers)
                print("🚨 Alert sent:", resp.status_code, resp.text)
            except Exception as e:
                print("❌ Failed to send alert to Node backend:", e)

        return jsonify({
            'success': True,
            'prediction': predicted_class,
            'confidence': round(confidence * 100, 2),
            'imageUrl': f"http://127.0.0.1:5000/uploads/{file.filename}"
        })
    except Exception as e:
        print("❌ Error during prediction:", str(e))
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


# ================================
# MAIN
# ================================
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
