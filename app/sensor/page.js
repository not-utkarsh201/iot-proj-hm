// app/sensor/page.js
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

function SensorPage() {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the latest sensor data
  const fetchSensorData = async () => {
    try {
      const response = await axios.get("/api/latest-data");
      setSensorData(response.data);
      setLoading(false); // Data is loaded
    } catch (err) {
      setError("Failed to fetch sensor data");
      setLoading(false);
    }
  };

  // UseEffect to fetch data when the component is mounted and every second after
  useEffect(() => {
    fetchSensorData();
    const intervalId = setInterval(() => {
      fetchSensorData();
    }, 1000); // Fetch data every second

    // Clear interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Sensor Data</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {sensorData && (
        <div>
          <p>
            <strong>Patient ID:</strong> {sensorData.patientId}
          </p>
          <p>
            <strong>Heart Rate:</strong> {sensorData.heartRate} BPM
          </p>
          <p>
            <strong>SPO2:</strong> {sensorData.spo2} %
          </p>
          <p>
            <strong>Temperature (DS18B20):</strong> {sensorData.tempDS18B20} °C
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(sensorData.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default SensorPage;
