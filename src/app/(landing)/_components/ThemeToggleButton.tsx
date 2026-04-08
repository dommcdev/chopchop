"use client";

import * as React from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-8 w-8 border-[2px] rounded-full border-foreground bg-primary text-foreground hover:-translate-y-[2px] hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun weight="bold" className="size-4" />
      ) : (
        <Moon weight="bold" className="size-4" />
      )}
    </Button>
  );
}
