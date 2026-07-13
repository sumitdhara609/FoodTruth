type ConfidenceLevel =
  | "High"
  | "Medium"
  | "Low"
  | "Unknown";

type ConfidenceItem = {
  label: string;
  confidence: ConfidenceLevel;
};

const sampleData: ConfidenceItem[] = [
  {
    label: "Brand",
    confidence: "High",
  },
  {
    label: "Product",
    confidence: "High",
  },
  {
    label: "Ingredients",
    confidence: "Medium",
  },
  {
    label: "Nutrition",
    confidence: "High",
  },
  {
    label: "Claims",
    confidence: "Unknown",
  },
];

function confidenceColor(
  confidence: ConfidenceLevel
) {
  switch (confidence) {

    case "High":
      return "text-green-600";

    case "Medium":
      return "text-yellow-600";

    case "Low":
      return "text-red-600";

    default:
      return "text-gray-500";

  }
}

export function ConfidenceCard() {

  return (

    <section className="rounded-xl border p-5 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Confidence
      </h2>

      <div className="space-y-3">

        {sampleData.map(item => (

          <div
            key={item.label}
            className="flex items-center justify-between"
          >

            <span>
              {item.label}
            </span>

            <span
              className={`font-medium ${confidenceColor(
                item.confidence
              )}`}
            >
              {item.confidence}
            </span>

          </div>

        ))}

      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between font-semibold">

        <span>
          Overall
        </span>

        <span className="text-green-600">
          92%
        </span>

      </div>

    </section>

  );

}