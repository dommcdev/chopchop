"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function ExampleErrorPage() {
  const [shouldCrash, setShouldCrash] = React.useState(false);

  if (shouldCrash) {
    throw new Error("Demo Crash: Rendering failed.");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button variant="destructive" onClick={() => setShouldCrash(true)}>
        Trigger error
      </Button>
    </div>
  );
}
