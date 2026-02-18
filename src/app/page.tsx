"use client"; // Required for interactivity

import { useState } from "react";
import { analyzeRecipe } from "@/actions/gemini"; // Import your backend function
import { Button } from "@/components/ui/button";

export default function Home() {
  // 1. State to hold the data we get back
  // We use 'any' for now to keep it simple, but ideally this is your Recipe type
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 2. The function that runs when you hit "Submit"
  async function handleSubmit(formData: FormData) {
    setLoading(true); // Turn on "loading" mode

    // Call the Server Action
    // This goes to the server, runs gemini.ts, and comes back
    const result = await analyzeRecipe(formData);

    setData(result); // Save the answer
    setLoading(false); // Turn off "loading"
  }

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>Gemini Recipe Tester</h1>

      {/* The Form */}
      <form action={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </form>

      <div>
        <Button>Click me</Button>
      </div>

      {/* The Results Display */}
      {data && (
        <div
          style={{ marginTop: "20px", padding: "20px", background: "#f0f0f0" }}
        >
          <h2>Result from Gemini:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
