import ApiRequestForm from "./components/ApiRequestForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        API Client
      </h1>
      <ApiRequestForm />
    </div>
  );
}

export default App;
