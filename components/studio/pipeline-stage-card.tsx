type PipelineStageStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

type PipelineStageCardProps = {
  title: string;
  status?: PipelineStageStatus;
  durationMs?: number;
  warnings?: number;
};

const statusColor: Record<
  PipelineStageStatus,
  string
> = {
  pending: "bg-gray-200",
  running: "bg-yellow-400",
  completed: "bg-green-500",
  failed: "bg-red-500",
};

export function PipelineStageCard({
  title,
  status = "pending",
  durationMs,
  warnings = 0,
}: PipelineStageCardProps) {
  return (
    <section className="rounded-xl border p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <span
            className={`h-3 w-3 rounded-full ${statusColor[status]}`}
          />

          <h2 className="font-semibold">
            {title}
          </h2>

        </div>

        <span className="text-sm capitalize text-muted-foreground">
          {status}
        </span>

      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">

        <div>

          <p className="text-muted-foreground">
            Duration
          </p>

          <p className="font-medium">
            {durationMs !== undefined
              ? `${durationMs} ms`
              : "--"}
          </p>

        </div>

        <div>

          <p className="text-muted-foreground">
            Warnings
          </p>

          <p className="font-medium">
            {warnings}
          </p>

        </div>

      </div>

    </section>
  );
}