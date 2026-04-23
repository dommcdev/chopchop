"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Database } from "@phosphor-icons/react";
import { seedDatabaseAction } from "@/data/seedDb2";

export function FillDatabaseButton2() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    if (
      !confirm(
        "Are you sure you want to fill the database with a lasagna recipe?",
      )
    ) {
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const result = await seedDatabaseAction();
    } catch (error) {
      setMessage("An error occurred while filling the database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleClick}
        disabled={loading}
        variant="outline"
        className="flex items-center gap-2"
      >
        {loading ? <Spinner className="w-4 h-4" /> : <Database size={20} />}
        {loading ? "Filling Database..." : "Fill Database with Lasagna Recipe"}
      </Button>
      {message && (
        <p
          className={`text-sm ${message.includes("Failed") ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
