// components/FoodCard.jsx
import React from "react";
import { AlertTriangle, Info } from "lucide-react";

const FoodCard = ({ foodPair }) => {
  const getSeverityColor = (description) => {
    if (description.includes("သေ"))
      return "bg-red-100 border-red-300 text-red-800";
    if (
      description.includes("မူးဝေ") ||
      description.includes("အော့အန်") ||
      description.includes("ဝမ်းလျှော")
    )
      return "bg-orange-100 border-orange-300 text-orange-800";
    return "bg-yellow-100 border-yellow-300 text-yellow-800";
  };

  const getSeverityIcon = (description) => {
    if (description.includes("သေ")) return "💀";
    if (description.includes("မူးဝေ")) return "😵";
    if (description.includes("အော့အန်")) return "🤢";
    if (description.includes("ဝမ်းလျှော")) return "💩";
    if (description.includes("ရင်ကျပ်")) return "😫";
    return "⚠️";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-gray-800">Incompatible Pair</h3>
        </div>
        <span className="text-2xl">
          {getSeverityIcon(foodPair.Description)}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">
            {foodPair.FoodA}
          </span>
          <span className="text-gray-400">+</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">
            {foodPair.FoodB}
          </span>
        </div>
      </div>

      <div
        className={`mt-3 px-3 py-2 rounded-lg border ${getSeverityColor(
          foodPair.Description
        )}`}
      >
        <div className="flex items-center">
          <Info className="w-4 h-4 mr-2" />
          <span className="font-medium">{foodPair.Description}</span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
