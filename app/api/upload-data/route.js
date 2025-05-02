// app/api/sensordata/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const { patientId, heartRate, spo2, tempDS18B20, tempDHT, humDHT } = body;

  if (
    !patientId ||
    heartRate === undefined ||
    spo2 === undefined ||
    tempDS18B20 === undefined ||
    tempDHT === undefined ||
    humDHT === undefined
  ) {
    return new Response(
      JSON.stringify({ error: "Missing required sensor data or patientId" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const sensorData = {
    patientId,
    heartRate,
    spo2,
    tempDS18B20,
    tempDHT,
    humDHT,
    timestamp: new Date().toISOString(),
  };

  try {
    const client = await clientPromise;
    const db = client.db("patient_info"); // database
    const collection = db.collection("iot"); // collection

    const result = await collection.updateOne(
      { patientId }, // filter by patientId
      { $set: sensorData }, // set sensor data
      { upsert: true } // insert if doesn't exist
    );

    return new Response(
      JSON.stringify({ message: "Data stored/updated successfully", result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("MongoDB error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
