// pages/Browse.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Search, Filter, AlertTriangle } from "lucide-react";
import FoodCard from "../components/FoodCard";

const Browse = () => {
  const incompatiblePairs = useSelector(
    (state) => state?.[0]?.Tbl_IncompatibleFood || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredPairs = incompatiblePairs.filter((pair) => {
    const matchesSearch =
      pair.FoodA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.FoodB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pair.Description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" || pair.Description.toLowerCase().includes(filter);

    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: "all", label: "All", count: incompatiblePairs.length },
    {
      id: "သေ",
      label: "Severe (Death)",
      count: incompatiblePairs.filter((p) => p.Description.includes("သေ"))
        .length,
    },
    {
      id: "ဝမ်းလျှော",
      label: "Diarrhea",
      count: incompatiblePairs.filter((p) =>
        p.Description.includes("ဝမ်းလျှော")
      ).length,
    },
    {
      id: "အော့အန်",
      label: "Vomiting",
      count: incompatiblePairs.filter((p) => p.Description.includes("အော့အန်"))
        .length,
    },
    {
      id: "မူးဝေ",
      label: "Dizziness",
      count: incompatiblePairs.filter((p) => p.Description.includes("မူးဝေ"))
        .length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            အစားအစာ မတည့်မှု စာရင်း
          </h1>
          <p className="text-gray-600">
            အတူမစားသင့်သော အစားအစာ စုံတွဲ {incompatiblePairs.length} ခု
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="အစားအစာ သို့မဟုတ် သက်ရောက်မှု ရှာဖွေရန်..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                onClick={() => setFilter(filterItem.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  filter === filterItem.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filterItem.label}
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                  {filterItem.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredPairs.length} results found
            </h2>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear search
              </button>
            )}
          </div>

          {filteredPairs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPairs.map((pair) => (
                <FoodCard key={pair.Id} foodPair={pair} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try different search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
