import { useState } from "react";

const ApiRequestForm = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to validate URL format
  const isValidUrl = (inputUrl) => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return false;
    }
  };

  // Function to send API Request
  const sendRequest = async () => {
    if (!url) {
      setError("Please enter an API URL.");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Invalid URL format. Please enter a valid API URL.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (method !== "GET") {
        options.body = body ? JSON.stringify(JSON.parse(body)) : null;
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError("Failed to fetch data. Please check the URL or request format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">API Request</h2>

        {/* URL Input with HTTP Method Dropdown & Send Button */}
        <div className="flex items-center border border-gray-300 bg-white p-2 rounded-md">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="mr-2 rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-900 focus:outline-none"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>

          <input
            type="text"
            placeholder="Enter API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow p-2 text-sm border-0 focus:ring-0 focus:outline-none"
          />

          <button
            onClick={sendRequest}
            disabled={loading}
            className={`ml-2 px-4 py-2 rounded-md text-black ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Loading..." : "Send Request"}
          </button>
        </div>

        {/* ✅ Show Error Message Only When Send Request is Clicked */}
        {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}

        {method !== "GET" && (
          <div className="mt-4">
            <label htmlFor="body" className="block text-sm font-medium text-gray-900">
              Body (JSON format)
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              className="mt-2 w-full p-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            />
          </div>
        )}

        {/* ✅ Display API Response Below Form */}
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold">Response:</h3>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiRequestForm;
