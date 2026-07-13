const sampleJson = {
  brand: "Bingo",
  product: "Mad Angles",
  category: "Snack",

  nutrition: {
    energy: "160 kcal",
    protein: "2.2 g",
    fat: "9.5 g",
    sugar: "2.8 g",
    sodium: "487 mg",
  },

  confidence: {
    overall: 92,
  },
};

export function JsonViewer() {
  return (
    <section className="rounded-xl border p-5 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Pipeline JSON
      </h2>

      <pre className="overflow-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
        {JSON.stringify(sampleJson, null, 2)}
      </pre>

    </section>
  );
}