"use client";

import { useState, useTransition } from "react"; // 1. Import useTransition
import { analyzeRecipe } from "@/actions/gemini";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [data, setData] = useState<Awaited<
    ReturnType<typeof analyzeRecipe>
  > | null>(null);
  // 2. Replace manual loading state with startTransition
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    // 3. Wrap the server action call in startTransition
    startTransition(async () => {
      const result = await analyzeRecipe(formData);
      setData(result);
    });
  }

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <form action={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <br />
        <br />
        {/* 4. Use isPending instead of loading */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Analyzing..." : "Upload & Analyze"}
        </Button>
      </form>

      {isPending && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Spinner />
          <p>Gemini is reading your recipe...</p>
        </div>
      )}

      {data && !isPending && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#000000",
            color: "#fff",
          }}
        >
          <h2>Result from Gemini:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
