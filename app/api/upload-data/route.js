export async function POST(request) {
  const body = await request.json();
  const { heartRate, spo2, tempDS18B20, tempDHT, humDHT } = body;

  if (
    heartRate === undefined ||
    spo2 === undefined ||
    tempDS18B20 === undefined ||
    tempDHT === undefined ||
    humDHT === undefined
  ) {
    return new Response(
      JSON.stringify({ error: "Missing sensor data in request body" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const latestData = {
    heartRate,
    spo2,
    tempDS18B20,
    tempDHT,
    humDHT,
    timestamp: new Date().toISOString(),
  };

  // Store the data in memory (not persistent)
  global.latestSensorData = latestData;

  console.log("Received data:", latestData);

  return new Response(
    JSON.stringify({ message: "Data received successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
