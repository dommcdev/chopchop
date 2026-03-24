"use client";

import { useState, useTransition, useRef } from "react";
import { analyzeRecipe } from "@/data/gemini";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function UploadPage() {
  const [data, setData] = useState<Awaited<
    ReturnType<typeof analyzeRecipe>
  > | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return String(value);
  };

  const formatMinutes = (value: number | null | undefined) => {
    if (value === null || value === undefined) {
      return "-";
    }

    return `${value} min`;
  };

  // This handles both the click and the drop
  const processUpload = (file: File) => {
    // 5MB Limit
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (Max 5MB)");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("image", file);
      const result = await analyzeRecipe(formData);
      setData(result);
    });
  };

  return (
    <main
      // This allows dragging ANYWHERE on the page
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) processUpload(file);
      }}
      className="min-h-screen p-12 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">Upload Your Recipe</h1>
        <p className="text-zinc-300">
          Click the button or drag an image anywhere on this screen.
        </p>

        {/* Hidden Native Input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && processUpload(e.target.files[0])
          }
        />

        <Button
          size="lg"
          disabled={isPending}
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-8 text-lg transition-colors"
        >
          {isPending ? <Spinner className="mr-2" /> : null}
          {isPending ? "Analyzing..." : "Choose Image"}
        </Button>

        {data && !isPending && (
          <div className="mt-8 space-y-6 rounded-xl border border-zinc-700 bg-black p-6 text-left text-white">
            <div>
              <h2 className="text-xl font-bold">{data.name}</h2>
              <p className="mt-2 text-sm text-zinc-300">
                {formatValue(data.description)}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-zinc-800 p-3">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Servings
                </p>
                <p className="mt-1 text-sm">{formatValue(data.servings)}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 p-3">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Prep Time
                </p>
                <p className="mt-1 text-sm">{formatMinutes(data.prepTime)}</p>
              </div>
              <div className="rounded-lg border border-zinc-800 p-3">
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Cook Time
                </p>
                <p className="mt-1 text-sm">{formatMinutes(data.cookTime)}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Ingredients</h3>
              <div className="space-y-3">
                {data.ingredients.map((ingredient, index) => (
                  <div
                    key={`${ingredient.name}-${index}`}
                    className="rounded-lg border border-zinc-800 p-3"
                  >
                    <p className="font-medium">{ingredient.name}</p>
                    <p className="mt-1 text-sm text-zinc-300">
                      {ingredient.quantity} {ingredient.unit}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Raw: {ingredient.originalText}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Instructions</h3>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-200">
                {data.instructions.map((instruction, index) => (
                  <li key={`${instruction.slice(0, 20)}-${index}`}>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Raw Response</h3>
              <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-300">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
