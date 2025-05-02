import clientPromise from "@/lib/mongodb";

export async function GET() {
  const patientId = "1"; // You can replace this with a dynamic parameter if needed

  try {
    const client = await clientPromise;
    const db = client.db("patient_info"); // Use correct database name
    const collection = db.collection("iot"); // Use correct collection name

    // Query the latest data for the specific patientId, sorting by timestamp (descending)
    const latestData = await collection
      .find({ patientId })
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (latestData.length === 0) {
      return new Response(
        JSON.stringify({ error: "No data found for patient" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify(latestData[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MongoDB error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
