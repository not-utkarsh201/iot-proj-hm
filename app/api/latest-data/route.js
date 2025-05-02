export async function GET() {
  const data = global.latestSensorData || {};
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
