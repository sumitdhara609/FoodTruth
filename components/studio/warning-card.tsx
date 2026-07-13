type WarningItem = {
  severity: "Info" | "Warning" | "Critical";
  message: string;
};

const sampleWarnings: WarningItem[] = [
  {
    severity: "Warning",
    message: "Ingredients section not found.",
  },
  {
    severity: "Info",
    message: "Serving size inferred from nutrition table.",
  },
  {
    severity: "Critical",
    message: "Energy value could not be validated.",
  },
];

function severityColor(
  severity: WarningItem["severity"]
) {
  switch (severity) {
    case "Info":
      return "text-blue-600";

    case "Warning":
      return "text-yellow-600";

    case "Critical":
      return "text-red-600";
  }
}

export function WarningCard() {
  return (
    <section className="rounded-xl border p-5 shadow-sm">

      <h2 className="mb-4 text-lg font-semibold">
        Warnings
      </h2>

      <div className="space-y-4">

        {sampleWarnings.map((warning, index) => (

          <div
            key={index}
            className="rounded-lg border p-3"
          >

            <div
              className={`font-semibold ${severityColor(
                warning.severity
              )}`}
            >
              {warning.severity}
            </div>

            <p className="mt-1 text-sm">
              {warning.message}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}