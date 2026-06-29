type FormTextareaProps = {
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  rows?: number;
  onChange: (value: string) => void;
};

export function FormTextarea({
  label,
  value,
  placeholder,
  error,
  rows = 5,
  onChange,
}: FormTextareaProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--foreground)]/58">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={
          error
            ? "mt-2 w-full resize-none rounded-2xl border border-[var(--danger)] bg-[var(--background)] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--danger)]"
            : "mt-2 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
        }
      />

      {error && <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>}
    </label>
  );
}