import React, { useState } from 'react';
import axios from 'axios';
import Card from "../common/Card";

const UploadTrack = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axios.post("http://localhost:5000/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Upload Track Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          {loading ? "Processing..." : "Upload & Predict"}
        </button>
      </Card>

      {result && (
        <Card>
          <h4 className="text-lg font-semibold mb-2">Prediction Result</h4>
          <p><b>Defect:</b> {result.defect}</p>
          <p><b>Severity:</b> {result.severity}</p>
          <p><b>Confidence:</b> {result.confidence}</p>
        </Card>
      )}
    </div>
  );
};

export default UploadTrack;