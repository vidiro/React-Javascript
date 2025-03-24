import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || "");
  };

  const handleUpload = async () => {
    if (!file) return alert("Por favor seleccione un archivo.");
    setIsLoading(true);
    try {
      // For MVP, we use S3 directly via a presigned URL generated manually.
      // Replace the following URL with your presigned URL endpoint if set up.
      const presignedURL = "https://mvp-cv-storage2.s3.us-east-1.amazonaws.com/queryhandler.zip?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDzr590jgpbpe0GjthrScgMpdZSORvXmCIb%2BEcarInGcAIhAPsklQJ2zOWTcWZcj%2BW%2Bw9tatatQogFADQ4d5GoiMi8SKtQDCPL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMOTk3NDAxMzM5NTcxIgypkedvvGtc%2FdNbWhoqqAPJQWsVVay6%2BTZoKXTg9bciFHqXTs2xXNTP0L3a5AwMu8rnRJJBga4jQr0hVhgjFvws4N33kfLgnFbEHbvbfmU69Fk%2FmMLqjZM7NPTyuhTTqzDLEUQtfDp%2BEgqiSS875ROIJTpqWoG9RNbGk5YFCb7KF97jpi9HmJpmKnrqLlXFzEHR5ICgpynuZXSX%2F%2BlALlIGP19N5jxupFr5KhRAG%2FeHMVW40j63dvUeQgFv5czDPuDfSdmP8uffWT%2BHgCEPlXp3zWdvHuQPxwYIEUy25MeLswE%2F4l8w9HzIL4euZ29bPsFlanLOYRBsnCDJsE5yt1sUVwVyRzeCab47X7peMk%2B3hOPFW6cgbsPwl1CgfLnXHc%2Fww7ZvRXa2Y%2B3LmSvVJC9DF0Whz6aAOlTies9h8whDXZNoZT7OQFvL%2F2yTqwbRASm4PAPjP2aTXjbx7ZXJyaitl4mfEYRqgcm0tLiMt5umslGW%2BFo%2F2TaxGJF5xSVCYDyFhFECoJiQ%2BLUqltbSGdcJVMPO2E%2BMgUJkCNziwNeUaNwCMTVBT9OKMsj%2Fg4lzfhjPQNWIERq0MIe2hL8GOuMCzITHoGtJyje9sQU0hL1ggFGHDxNUFLdB7ehwiyV1RhDB81MQL%2BWgXdEZ6lPSPCJ2sOMjvEAvb9dlbY8VaHmKRtDaeI3CZenSxFY97hxa4qdKKX3YXatIODyN3sEt17SuJTWzJd9jyqbhAB0qpp7v3ofvUT5F1%2Ft8aztWTSNwoOTvhSpSvio3QtoFrIOv7t3%2B%2FFdHWoISDGoQAcZfGeJVGAX1FlupN7zyNfU0gQ9XQ8wabxw3rvQW0OvZZg5IwnqfachitSs8cjd3wXdBcKDhCNP7YIBLmSr67EuQuycLstKdVWISzdsC3qYkmHzlpXhKI1DBofvxmwwuG%2BCJPP5G5OLUcEQvZw%2BtPuDT%2B15QcXP6qIK1IY0CXu2OWggCzYcQHnTn2NeMAWTWxU%2BjnxdOvD2RLDkinSHGyu%2Fr3L4r5i0Rya%2B6LmJODBhmfok9KdnvVhHUcyIahmSk6OVojuPMcgEJiw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6QOOAU2Z3G6ZXMKN%2F20250324%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250324T171217Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=82c322426bd3937203a44a414c7ff4a8ac40db17f289a341cc236212ffbb6bba";

      const uploadResponse = await fetch(presignedURL, {
        method: 'PUT',
        body: file,
      });
      if (uploadResponse.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Upload failed");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Error en la carga: " + error.message);
    }
  };

  const handleQuery = async () => {
    if (!query.trim()) return alert("Por favor ingrese una descripción del trabajo");
    setIsLoading(true);
    try {
      const apiEndpoint = "https://nuqxy70w54.execute-api.us-east-1.amazonaws.com/query"; // e.g., https://xxxxxxx.execute-api.region.amazonaws.com/dev/query
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResults(data.matches || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Error en la búsqueda: " + error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Sistema de Búsqueda de CVs</h1>
      </div>

      <div className="main-content">
        <div className="upload-section">
          <h2>Subir CV</h2>
          <div className="file-upload-container">
            <label className="file-upload-label">
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx"
                className="file-input"
              />
              <span className="upload-button">
                {fileName || "Seleccionar archivo"}
              </span>
            </label>
            <button 
              className="action-button"
              onClick={handleUpload}
              disabled={!file || isLoading}
            >
              {isLoading ? "Subiendo..." : "Subir CV"}
            </button>
          </div>
        </div>

        <div className="search-section">
          <h2>Buscar Candidatos</h2>
          <div className="search-container">
            <textarea
              placeholder="Ingrese la descripción del trabajo..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="search-input"
            />
            <button 
              className="action-button"
              onClick={handleQuery}
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>

        <div className="results-section">
          <h2>Resultados</h2>
          {results.length > 0 ? (
            <div className="results-container">
              {results.map((match, index) => (
                <div key={index} className="result-card">
                  <div className="result-header">
                    <h3>Candidato {index + 1}</h3>
                    <span className="score">
                      Coincidencia: {(match.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="result-content">
                    <p className="file-name">
                      Archivo: {match.metadata?.file_name}
                    </p>
                    <p className="explanation">
                      {match.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No hay resultados para mostrar</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
