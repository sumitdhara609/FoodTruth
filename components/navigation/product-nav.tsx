import Link from "next/link";
import {
  appNavigationLinks,
  authNavigationLinks,
} from "@/lib/navigation/app-navigation";

export function ProductNav() {
  return (
    <nav className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="group inline-flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-bold text-[var(--background)]">
          F
        </span>

        <span>
          <span className="block text-sm font-semibold tracking-[-0.03em] text-[var(--foreground)]">
            FoodTruth
          </span>
          <span className="block text-xs text-[var(--foreground)]/45">
            Label intelligence
          </span>
        </span>
      </Link>

      <div className="flex flex-wrap gap-2">
        {appNavigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]/62 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            {link.label}
          </Link>
        ))}

        {authNavigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--background)] transition hover:opacity-90"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}