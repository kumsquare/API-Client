import React from "react";

const ResponsePanel = ({ responseData, isLoading, error }) => {
  return (
    <div className="mt-4 p-4 border rounded bg-white shadow-md dark:bg-gray-800 dark:text-white">
      <h2 className="text-lg font-semibold mb-2">Response</h2>

      {isLoading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : responseData ? (
        <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-auto max-h-64">
          {JSON.stringify(responseData, null, 2)}
        </pre>
      ) : (
        <p className="text-gray-500">No response yet</p>
      )}
    </div>
  );
};

export default ResponsePanel;
