"use client";
import React, { useState, useRef } from "react";

export default function UploadTrack() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  
  // Use ref to access file input directly
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setError(null);
    setPrediction(null);
    
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      setFileName(null);
      return;
    }

    console.log("📁 File selected:", file.name, file.type, file.size);
    setFileName(file.name);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    // Get file directly from input ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setError("Please select a file");
      return;
    }

    const file = fileInput.files[0];
    
    console.log("\n" + "=".repeat(60));
    console.log("🚀 UPLOAD STARTING");
    console.log("=".repeat(60));
    console.log("File from input.files[0]:");
    console.log("  Name:", file.name);
    console.log("  Type:", file.type);
    console.log("  Size:", file.size);
    console.log("  instanceof File:", file instanceof File);
    console.log("  instanceof Blob:", file instanceof Blob);

    // Validate
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File too large (max 10MB)');
      return;
    }

    if (file.size === 0) {
      setError('File is empty');
      return;
    }

    // Create FormData directly from the file input
    const formData = new FormData();
    formData.append("file", file, file.name);

    // Debug FormData
    console.log("\n📦 FormData Debug:");
    let entryCount = 0;
    for (let pair of formData.entries()) {
      entryCount++;
      const [key, value] = pair;
      console.log(`Entry ${entryCount}:`);
      console.log(`  Key: "${key}" (type: ${typeof key}, length: ${key.length})`);
      console.log(`  Key charCodes:`, Array.from(key).map(c => c.charCodeAt(0)));
      console.log(`  Value type:`, value.constructor.name);
      
      if (value instanceof File) {
        console.log(`  ✅ Value is File`);
        console.log(`    - name: "${value.name}"`);
        console.log(`    - type: "${value.type}"`);
        console.log(`    - size: ${value.size}`);
      } else if (value instanceof Blob) {
        console.log(`  ⚠ Value is Blob (not File)`);
        console.log(`    - type: "${value.type}"`);
        console.log(`    - size: ${value.size}`);
      }
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      console.log("\n🌐 Making fetch request...");
      
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      console.log("\n📡 Response:");
      console.log("  Status:", response.status);
      console.log("  StatusText:", response.statusText);
      console.log("  OK:", response.ok);

      const responseText = await response.text();
      console.log("  Response body:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        throw new Error("Invalid JSON response: " + responseText);
      }

      if (!response.ok) {
          console.error("❌ Error data:", data);
          throw new Error(data.error || `HTTP ${response.status}`);
        }

      console.log("✅ Success:", data);
      setPrediction(data);

    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log("=".repeat(60) + "\n");
    }
  };

  // Alternative: Upload using XMLHttpRequest
  const handleUploadXHR = () => {
    const fileInput = fileInputRef.current;
    if (!fileInput?.files?.[0]) {
      setError("Please select a file");
      return;
    }

    const file = fileInput.files[0];
    console.log("🚀 XMLHttpRequest Upload");
    console.log("File:", file.name, file.type, file.size);

    const formData = new FormData();
    formData.append("file", file, file.name);

    setLoading(true);
    setError(null);
    setPrediction(null);

    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        console.log(`Progress: ${((e.loaded / e.total) * 100).toFixed(1)}%`);
      }
    });

    xhr.addEventListener("load", () => {
      setLoading(false);
      console.log("Response status:", xhr.status);
      console.log("Response:", xhr.responseText);

      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setPrediction(data);
      } else {
        const data = JSON.parse(xhr.responseText);
        setError(data.error || `HTTP ${xhr.status}`);
      }
    });

    xhr.addEventListener("error", () => {
      setLoading(false);
      console.error("Network error");
      setError("Network error");
    });

    xhr.open("POST", "http://127.0.0.1:5000/predict");
    xhr.send(formData);
  };

  // Test with synthetic file
  const handleTest = async () => {
    console.log("🧪 Test Upload");
    
    // Create minimal valid PNG
    const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const pngBinary = atob(pngBase64);
    const bytes = new Uint8Array(pngBinary.length);
    for (let i = 0; i < pngBinary.length; i++) {
      bytes[i] = pngBinary.charCodeAt(i);
    }
    
    const blob = new Blob([bytes], { type: 'image/png' });
    const file = new File([blob], 'test.png', { type: 'image/png' });
    
    console.log("Test file:", file.name, file.type, file.size);
    console.log("instanceof File:", file instanceof File);

    const formData = new FormData();
    formData.append("file", file, file.name);

    console.log("FormData entries:");
    for (let [k, v] of formData.entries()) {
      console.log(`  "${k}":`, v);
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      console.log("Response:", res.status, text);
      
      if (res.ok) {
        alert("✅ Test successful! Server is working.");
      } else {
        alert("❌ Test failed: " + text);
      }
    } catch (err) {
      console.error("Test error:", err);
      alert("❌ Test error: " + err.message);
    }
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
    setFileName(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Railway Track Defect Detection
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Upload an image for AI-powered defect analysis
        </p>

        {/* Upload Card */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          {/* File Input */}
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 hover:bg-gray-700/30 transition-colors mb-4">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG (max 10MB)</p>
              {fileName && (
                <p className="mt-2 text-sm text-blue-400 font-medium">
                  Selected: {fileName}
                </p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              onClick={handleUpload}
              disabled={loading || !fileName}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Predict (Fetch)
                </>
              )}
            </button>

            <button
              onClick={handleUploadXHR}
              disabled={loading || !fileName}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Predict (XHR)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleTest}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🧪 Test Server
            </button>

            <button
              onClick={handleReset}
              disabled={loading}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <img src={previewUrl} alt="Preview" className="max-w-full max-h-96 mx-auto rounded-lg" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-red-400">Error</h3>
                <p className="text-sm text-red-300 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {prediction && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Results
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400">Prediction</p>
                <p className="text-2xl font-bold text-green-400 mt-1">
                  {prediction.prediction || 'N/A'}
                </p>
              </div>

              {prediction.confidence !== undefined && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Confidence</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-600 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                    <span className="text-lg font-semibold text-blue-400">
                      {(prediction.confidence).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              <details className="bg-gray-700 rounded-lg p-4">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">
                  Raw Response
                </summary>
                <pre className="mt-2 text-xs text-gray-300 overflow-x-auto">
                  {JSON.stringify(prediction, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}