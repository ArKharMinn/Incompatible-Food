import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Utensils,
  AlertTriangle,
  Search,
  Users,
  BookOpen,
  Shield,
  ChefHat,
  Heart,
  Flame,
  TrendingUp,
  Zap,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import FoodCompatibilityChecker from "../components/FoodCompatibilityChecker";
import FoodCard from "../components/FoodCard";

const Home = () => {
  const dispatch = useDispatch();

  // Get data from Redux store
  const incompatiblePairs = useSelector(
    (state) => state?.[0]?.Tbl_IncompatibleFood || []
  );

  const [featuredPairs, setFeaturedPairs] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Select random featured pairs
    if (incompatiblePairs.length > 0) {
      const shuffled = [...incompatiblePairs].sort(() => 0.5 - Math.random());
      setFeaturedPairs(shuffled.slice(0, 8));
    }
  }, [incompatiblePairs]);

  // Get filtered pairs based on selected filter
  const getFilteredPairs = () => {
    if (filter === "all") return featuredPairs;
    return featuredPairs.filter((pair) =>
      pair.Description.toLowerCase().includes(filter)
    );
  };

  const stats = [
    {
      label: "Incompatible Pairs",
      value: incompatiblePairs.length.toString(),
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "bg-red-100 text-red-600",
    },
    {
      label: "Food Items",
      value: "200+",
      icon: <Utensils className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Health Effects",
      value: "12+",
      icon: <Heart className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Verified Sources",
      value: "50+",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Compatibility Check",
      description: "Instantly check if your food combinations are safe",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Health Risk Alerts",
      description: "Get warnings about potential health issues",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Traditional Wisdom",
      description: "Based on Myanmar traditional food knowledge",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety First",
      description: "Protect your health with verified information",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const filters = [
    { id: "all", label: "All", icon: <Filter className="w-4 h-4" /> },
    { id: "သေ", label: "Severe", icon: <Flame className="w-4 h-4" /> },
    {
      id: "ဝမ်းလျှော",
      label: "Digestive",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    { id: "အော့အန်", label: "Nausea", icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              အစားအသောက် မတည့်မှုများ
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              အတူတကွ မစားသင့်သော အစားအစာများကို ရှာဖွေပြီး သင့်ကျန်းမာရေးကို
              ကာကွယ်ပါ။
            </p>

            {/* Main Compatibility Checker */}
            <div className="max-w-4xl mx-auto mb-8">
              <FoodCompatibilityChecker incompatiblePairs={incompatiblePairs} />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/search"
                className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-200"
              >
                <Search className="w-5 h-5 mr-2" />
                အစားအစာ ရှာဖွေရန်
              </Link>
              <Link
                to="/browse"
                className="inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-200 backdrop-blur-sm"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                စာရင်းအားလုံးကြည့်ရန်
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ကျွန်ုပ်တို့၏ဝန်ဆောင်မှုများ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            သင့်ကျန်းမာရေးအတွက် အရေးကြီးသော အစားအစာ မတည့်မှုအချက်အလက်များ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div
                className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Incompatible Pairs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              သတိထားရမည့် အစားအစာများ
            </h2>
            <p className="text-gray-600">အတူမစားသင့်သော အစားအစာ စုံတွဲများ</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 mt-4 md:mt-0">
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
                <span className="mr-2">{filterItem.icon}</span>
                {filterItem.label}
              </button>
            ))}
          </div>
        </div>

        {getFilteredPairs().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFilteredPairs().map((pair) => (
              <FoodCard key={pair.Id} foodPair={pair} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No matching pairs found for this filter.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/browse"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            အပြည့်အစုံကြည့်ရန်
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            သင့်ကျန်းမာရေးကို အရေးထားပါသလား?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            နေ့စဉ်စားသောက်နေသော အစားအစာများ အတူတကွစားသုံးခြင်း အန္တရာယ်ရှိမရှိ
            စစ်ဆေးကြည့်ပါ။
          </p>
          <Link
            to="/check"
            className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition duration-200 shadow-lg"
          >
            <Search className="w-6 h-6 mr-3" />
            အခမဲ့ စစ်ဆေးကြည့်ရန်
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
              <span className="text-2xl font-bold">IncompatibleFood</span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              အတူမစားသင့်သော အစားအစာများအကြောင်း သတင်းအချက်အလက်များကို
              စုစည်းထားသော ပလက်ဖောင်း။
            </p>
            <p className="text-gray-500 mt-8">
              © {new Date().getFullYear()} IncompatibleFood. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
