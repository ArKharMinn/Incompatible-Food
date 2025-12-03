// components/FoodCompatibilityChecker.jsx
import React, { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";

const FoodCompatibilityChecker = ({ incompatiblePairs, onSearch }) => {
  const [foodA, setFoodA] = useState("");
  const [foodB, setFoodB] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    if (!foodA.trim() || !foodB.trim()) return;

    // Convert to lowercase for case-insensitive comparison
    const searchA = foodA.trim().toLowerCase();
    const searchB = foodB.trim().toLowerCase();

    // Find matching pairs
    const matches = incompatiblePairs.filter((pair) => {
      const pairA = pair.FoodA.toLowerCase();
      const pairB = pair.FoodB.toLowerCase();

      // Check both directions (A+B and B+A)
      return (
        (pairA.includes(searchA) && pairB.includes(searchB)) ||
        (pairA.includes(searchB) && pairB.includes(searchA))
      );
    });

    if (matches.length > 0) {
      setResult({
        isCompatible: false,
        matches: matches,
      });
    } else {
      setResult({
        isCompatible: true,
        message: "These foods appear to be safe to eat together.",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Food Compatibility Checker
        </h2>
        <p>Check if two foods can be eaten together safely</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Food Item
          </label>
          <input
            type="text"
            value={foodA}
            onChange={(e) => setFoodA(e.target.value)}
            placeholder="e.g., ဝက်သား"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Food Item
          </label>
          <input
            type="text"
            value={foodB}
            onChange={(e) => setFoodB(e.target.value)}
            placeholder="e.g., ဒေါင်းသား"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={handleCheck}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
      >
        <Search className="w-5 h-5 mr-2" />
        Check Compatibility
      </button>

      {result && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            result.isCompatible
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-start">
            {result.isCompatible ? (
              <div className="text-green-600 mt-1 mr-3">✓</div>
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 mt-1 mr-3" />
            )}
            <div>
              <h3
                className={`font-semibold ${
                  result.isCompatible ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.isCompatible
                  ? "Safe Combination"
                  : "⚠️ Incompatible Foods"}
              </h3>
              {result.isCompatible ? (
                <p className="text-green-700 mt-1">{result.message}</p>
              ) : (
                <div className="mt-2">
                  <p className="text-red-700 mb-3">
                    These foods should not be eaten together. Possible effects:
                  </p>
                  {result.matches.map((match, index) => (
                    <div key={index} className="mb-2 p-3 bg-red-100 rounded">
                      <p className="font-medium text-red-800">
                        {match.FoodA} + {match.FoodB}
                      </p>
                      <p className="text-red-700 mt-1">
                        Effect: {match.Description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodCompatibilityChecker;
