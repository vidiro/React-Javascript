import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    // For MVP, we use S3 directly via a presigned URL generated manually.
    // Replace the following URL with your presigned URL endpoint if set up.
    const presignedURL = "https://mvp-cv-storage2.s3.us-east-1.amazonaws.com/mi-archivo.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA6QOOAU2ZSZPSCTDQ%2F20250323%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250323T085137Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=508860f1318c9691fc966ec57dc9c30321e6fa04ce82937d16b28af2e3f0cb38";

    const uploadResponse = await fetch(presignedURL, {
      method: 'PUT',
      body: file,
    });
    if (uploadResponse.ok) {
      alert("File uploaded successfully");
    } else {
      alert("Upload failed");
    }
  };

  const handleQuery = async () => {
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
  };

  return (
    <div className="App">
      <h2>Upload CV</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Search Candidates</h2>
      <input
      type="text"
        placeholder="Enter job description"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>Search</button>

      <h2>Results</h2>
      <ul>
        {results.map((match, index) => (
          <li key={index}>
            Candidate: {match.metadata?.file_name} - Score: {match.score?.toFixed(2)}<br/>
            Explanation: {match.explanation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
