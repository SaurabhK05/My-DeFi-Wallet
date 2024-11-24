// hooks/useTheme.js
import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("light"); // Default to light
  const [mounted, setMounted] = useState(false); // To avoid hydration mismatch

  useEffect(() => {
    setMounted(true); // Mark as mounted
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    const root = document.documentElement;
    root.classList.remove(theme);
    root.classList.add(newTheme);
  };

  return { theme, toggleTheme, mounted };
}
