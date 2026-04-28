"use client";

import * as React from "react";
import { UserButton } from "@clerk/nextjs";
import {
  ArchiveIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useRecipesExport } from "@/hooks/useRecipesExport";

const CustomUserButton = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { runExport, isExporting } = useRecipesExport();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background shadow-md">
      <UserButton
        fallback={
          <UserCircleIcon className="size-7 rounded-full bg-card/80 animate-pulse" />
        }
      >
        <UserButton.MenuItems>
          <UserButton.Action
            labelIcon={<ArchiveIcon weight="bold" className="size-4" />}
            onClick={runExport}
            label={isExporting ? "Exporting..." : "Export data"}
          />
          <UserButton.Action
            labelIcon={
              isDark ? (
                <SunIcon weight="bold" className="size-4" />
              ) : (
                <MoonIcon weight="bold" className="size-4" />
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
