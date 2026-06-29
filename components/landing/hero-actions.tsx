import { Camera, Upload, Keyboard } from "lucide-react";

export function HeroActions() {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-3">
      <button className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--primary)] px-5 py-4 text-left text-[var(--background)] shadow-[0_20px_55px_rgba(22,63,47,0.2)] transition hover:-translate-y-1 hover:opacity-95">
        <Camera size={18} />
        <span className="mt-4 block text-sm font-semibold">Scan instantly</span>
        <span className="mt-1 block text-xs leading-5 opacity-75">
          Built for quick mobile label checks during shopping.
        </span>
      </button>

      <button className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 text-left text-[var(--foreground)] transition hover:-translate-y-1 hover:bg-[var(--surface-muted)]">
        <Upload size={18} />
        <span className="mt-4 block text-sm font-semibold">Upload label</span>
        <span className="mt-1 block text-xs leading-5 text-[var(--foreground)]/55">
          Upload a clear label photo and receive structured insights.
        </span>
      </button>

      <button className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-4 text-left text-[var(--foreground)] transition hover:-translate-y-1 hover:bg-[var(--surface-muted)]">
        <Keyboard size={18} />
        <span className="mt-4 block text-sm font-semibold">Enter manually</span>
        <span className="mt-1 block text-xs leading-5 text-[var(--foreground)]/55">
          Add nutrition, ingredients, and claims without image scanning.
        </span>
      </button>
    </div>
  );
}