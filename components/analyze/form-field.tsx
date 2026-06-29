type FormFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  inputMode?: "text" | "decimal" | "numeric";
  onChange: (value: string) => void;
};

export function FormField({
  label,
  value,
  placeholder,
  error,
  inputMode = "text",
  onChange,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--foreground)]/58">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={
          error
            ? "mt-2 w-full rounded-2xl border border-[var(--danger)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--danger)]"
            : "mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
        }
      />

      {error && <p className="mt-2 text-xs text-[var(--danger)]">{error}</p>}
    </label>
  );
}