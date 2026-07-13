type TimingItem = {
  stage: string;
  durationMs: number;
};

const sampleTimings: TimingItem[] = [
  {
    stage: "OCR",
    durationMs: 812,
  },
  {
    stage: "OCR Cleaner",
    durationMs: 11,
  },
  {
    stage: "Layout Analyzer",
    durationMs: 7,
  },
  {
    stage: "Identity Extractor",
    durationMs: 3,
  },
  {
    stage: "Ingredients Extractor",
    durationMs: 5,
  },
  {
    stage: "Nutrition Extractor",
    durationMs: 18,
  },
  {
    stage: "Validation",
    durationMs: 2,
  },
];

export function TimingCard() {

  const total =
    sampleTimings.reduce(
      (sum, item) => sum + item.durationMs,
      0
    );

  return (

    <section className="rounded-xl border p-5 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Pipeline Timing
      </h2>

      <div className="space-y-3">

        {sampleTimings.map(item => (

          <div
            key={item.stage}
            className="flex items-center justify-between"
          >

            <span>
              {item.stage}
            </span>

            <span className="font-medium">
              {item.durationMs} ms
            </span>

          </div>

        ))}

      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between font-semibold">

        <span>Total</span>

        <span>{total} ms</span>

      </div>

    </section>

  );

}