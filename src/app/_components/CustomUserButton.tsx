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
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full ring-2 ring-foreground ring-offset-0 bg-primary">
      <UserButton
        fallback={
          <div className="size-full rounded-full bg-card/80 animate-pulse" />
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
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            label={"Toggle theme"}
          />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
};

export default CustomUserButton;
