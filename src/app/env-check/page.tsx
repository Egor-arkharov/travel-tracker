// src/app/env-check/page.tsx
export default function EnvCheck() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "NO_KEY";
  const masked =
    key === "NO_KEY" ? "NO_KEY" : `${key.slice(0, 6)}…${key.slice(-4)}`;
  return (
    <pre style={{ padding: 16 }}>
      NEXT_PUBLIC_GOOGLE_API_KEY = {masked}
    </pre>
  );
}
