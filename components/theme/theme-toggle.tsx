"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-3 py-2 text-xs font-medium text-[var(--foreground)]/70 shadow-sm backdrop-blur transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]",
        className
      )}
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--accent-muted)] text-[var(--primary)]">
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}