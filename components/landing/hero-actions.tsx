import Link from "next/link";
import { Camera, Keyboard, Upload } from "lucide-react";

export function HeroActions() {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-3">
      <Link
        href="/analyze"
        className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--primary)] px-5 py-4 text-left text-[var(--background)] shadow-[0_20px_55px_rgba(22,63,47,0.2)] transition hover:-translate-y-1 hover:opacity-95"
      >
        <Camera size={18} />
        <span className="mt-4 block text-sm font-semibold">Scan label</span>
        <span className="mt-1 block text-xs leading-5 opacity-75">
          Start from a clear label capture.
        </span>
      </Link>

      <Link
        href="/analyze"
        className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 text-left text-[var(--foreground)] transition hover:-translate-y-1 hover:bg-[var(--surface-muted)]"
      >
        <Upload size={18} />
        <span className="mt-4 block text-sm font-semibold">Upload label</span>
        <span className="mt-1 block text-xs leading-5 text-[var(--foreground)]/55">
          Add a label image for structured understanding.
        </span>
      </Link>

      <Link
        href="/analyze"
        className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 text-left text-[var(--foreground)] transition hover:-translate-y-1 hover:bg-[var(--surface-muted)]"
      >
        <Keyboard size={18} />
        <span className="mt-4 block text-sm font-semibold">Enter manually</span>
        <span className="mt-1 block text-xs leading-5 text-[var(--foreground)]/55">
          Add label values without image input.
        </span>
      </Link>
    </div>
  );
}