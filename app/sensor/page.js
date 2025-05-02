"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SensorDataPage() {
  const { data, error } = useSWR("/api/latest-data", fetcher, {
    refreshInterval: 3000, // Auto-refresh every 3 seconds
  });

  if (error)
    return <div className="p-4 text-red-500">Failed to load data.</div>;
  if (!data || Object.keys(data).length === 0)
    return <div className="p-4">No data received yet.</div>;

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">📊 Live Sensor Data</h1>
      <ul className="space-y-2 text-lg">
        <li>❤️ Heart Rate: {data.heartRate}</li>
        <li>🫁 SpO₂: {data.spo2}%</li>
        <li>🌡️ Temp (DS18B20): {data.tempDS18B20}°C</li>
        <li>🌡️ Temp (DHT): {data.tempDHT}°C</li>
        <li>💧 Humidity (DHT): {data.humDHT}%</li>
        <li>⏱️ Timestamp: {new Date(data.timestamp).toLocaleString()}</li>
      </ul>
    </div>
  );
}
