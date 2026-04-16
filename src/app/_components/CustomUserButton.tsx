"use client";

import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

const CustomUserButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    // Changed: rounded-full -> rounded-none
    // Changed: ring-2 ring-foreground -> border border-border
    // Added: shadow-sm
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm transition-shadow hover:shadow-md">
      <UserButton
        fallback={
          <div className="size-full rounded-none bg-card/80 animate-pulse" />
        }
      >
        <UserButton.MenuItems>
          <UserButton.Action
            labelIcon={
              isDark ? (
                <Sun weight="bold" className="size-4" />
              ) : (
                <Moon weight="bold" className="size-4" />
              )
            }
            onClick={() => setTheme(isDark ? "light" : "dark")}
            label={"Toggle theme"}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};
export default CustomUserButton;
