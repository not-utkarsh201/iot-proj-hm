import Image from "next/image";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome</h1>
      <Link href="/sensor">View Live Sensor Data</Link>
    </main>
  );
}
