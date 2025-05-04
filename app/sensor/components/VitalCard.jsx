import React, { useState, useEffect } from "react";

const colorMap = {
  rose: {
    light: "bg-rose-50 border-rose-200",
    medium: "bg-rose-100 text-rose-700",
    dark: "text-rose-600",
    progress: "bg-rose-500",
    pulse: "animate-pulse bg-rose-100",
  },
  blue: {
    light: "bg-blue-50 border-blue-200",
    medium: "bg-blue-100 text-blue-700",
    dark: "text-blue-600",
    progress: "bg-blue-500",
    pulse: "animate-pulse bg-blue-100",
  },
  amber: {
    light: "bg-amber-50 border-amber-200",
    medium: "bg-amber-100 text-amber-700",
    dark: "text-amber-600",
    progress: "bg-amber-500",
    pulse: "animate-pulse bg-amber-100",
  },
  emerald: {
    light: "bg-emerald-50 border-emerald-200",
    medium: "bg-emerald-100 text-emerald-700",
    dark: "text-emerald-600",
    progress: "bg-emerald-500",
    pulse: "animate-pulse bg-emerald-100",
  },
};

const VitalCard = ({
  title,
  value,
  unit,
  icon,
  color,
  thresholds,
  currentValue,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const colors = colorMap[color];

  const statusText = getStatusText(currentValue, thresholds);
  const statusColor = getStatusColor(currentValue, thresholds);

  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const calculateProgress = () => {
    const { low, high } = thresholds;
    const range = high - low;
    let progress = ((currentValue - low) / range) * 100;
    progress = Math.min(Math.max(progress, 0), 100);
    return progress;
  };

  return (
    <div
      className={`relative rounded-xl border ${colors.light} p-6 shadow-sm transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`rounded-full p-2 ${colors.medium}`}>{icon}</div>
        <div
          className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}
        >
          {statusText}
        </div>
      </div>

      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200 mb-1">
        {title}
      </h3>

      <div className="flex items-baseline space-x-1">
        <span
          className={`text-3xl font-bold ${colors.dark} transition-opacity ${
            isUpdating ? "animate-pulse" : ""
          }`}
        >
          {value}
        </span>
        <span className="text-base text-slate-700 dark:text-slate-400">
          {unit}
        </span>
      </div>

      <div className="mt-4">
        <div className="bg-slate-200 dark:bg-slate-900 rounded-full h-2 overflow-hidden">
          <div
            className={`${colors.progress} h-full rounded-full transition-all duration-700 ease-in-out`}
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

function getStatusText(value, thresholds) {
  const { low, normal, high } = thresholds;

  if (value < low) return "Low";
  if (value > high) return "High";
  return "Normal";
}

function getStatusColor(value, thresholds) {
  const { low, normal, high } = thresholds;

  if (value < low) return "bg-blue-100 text-blue-800";
  if (value > high) return "bg-red-100 text-red-800";
  return "bg-green-100 text-green-800";
}

export default VitalCard;
