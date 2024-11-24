"use client";

import useTheme from "@/hooks/useTheme";
import { Switch } from "../ui/switch";
import React from "react";

export function TogglDarkMode() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <div className="flex justify-end p-4">
      <p className="dark:text-white text-black mr-2">{theme}</p>
      <Switch onClick={toggleTheme} />
    </div>
  );
}
