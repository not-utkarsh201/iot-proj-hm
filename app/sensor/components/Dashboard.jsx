"use client";
import React, { useState, useEffect } from "react";
import { Heart, Thermometer, Droplet } from "lucide-react";
import VitalCard from "./VitalCard";
import PatientInfo from "./PatientInfo";
import axios from "axios";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSensorData = async () => {
    try {
      const response = await axios.get("/api/latest-data");
      setSensorData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch sensor data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(() => {
      fetchSensorData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full h-16 w-16 bg-blue-400 mb-4"></div>
          <div className="h-4 w-36 bg-blue-200 rounded mb-2"></div>
          <div className="h-3 w-24 bg-blue-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-md mx-auto text-center">
          <div className="text-red-500 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800">Connection Error</h3>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button
            onClick={fetchSensorData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 text-center md:text-left">
        Health Monitoring Dashboard
      </h1>

      <PatientInfo
        patientId={sensorData.patientId}
        timestamp={sensorData.timestamp}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <VitalCard
          title="Heart Rate"
          value={sensorData.heartRate}
          unit="BPM"
          icon={<Heart className="w-6 h-6" />}
          color="rose"
          thresholds={{ low: 60, normal: [60, 100], high: 100 }}
          currentValue={sensorData.heartRate}
        />
        <VitalCard
          title="Blood Oxygen"
          value={sensorData.spo2}
          unit="%"
          icon={<Droplet className="w-6 h-6" />}
          color="blue"
          thresholds={{ low: 92, normal: [92, 100], high: 101 }}
          currentValue={sensorData.spo2}
        />
        <VitalCard
          title="Body Temperature"
          value={sensorData.tempDS18B20}
          unit="°C"
          icon={<Thermometer className="w-6 h-6" />}
          color="amber"
          thresholds={{ low: 35, normal: [35, 37.5], high: 37.5 }}
          currentValue={parseFloat(sensorData.tempDS18B20)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
