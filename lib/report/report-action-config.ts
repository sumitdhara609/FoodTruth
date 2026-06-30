export type ReportActionKey = "copy" | "save" | "reset" | "compare" | "export";

export type ReportActionConfig = {
  key: ReportActionKey;
  label: string;
  status: "Ready" | "Planned";
};

export const reportActionConfig: ReportActionConfig[] = [
  {
    key: "copy",
    label: "Copy report",
    status: "Ready",
  },
  {
    key: "save",
    label: "Save to account",
    status: "Ready",
  },
  {
    key: "reset",
    label: "Reset analysis",
    status: "Ready",
  },
  {
    key: "compare",
    label: "Compare label",
    status: "Planned",
  },
  {
    key: "export",
    label: "Export card",
    status: "Planned",
  },
];

export const getReadyReportActions = () => {
  return reportActionConfig.filter((action) => action.status === "Ready");
};

export const getPlannedReportActions = () => {
  return reportActionConfig.filter((action) => action.status === "Planned");
};