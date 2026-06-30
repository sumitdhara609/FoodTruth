import type { SavedLabelReport } from "@/lib/account/saved-label-report";

export type AccountReportStats = {
  totalReports: number;
  averageScore: number | null;
  highConcernReports: number;
  latestReport: SavedLabelReport | null;
};

const highConcernKeywords = ["high", "very high", "critical"];

export const calculateAccountReportStats = (
  reports: SavedLabelReport[]
): AccountReportStats => {
  if (reports.length === 0) {
    return {
      totalReports: 0,
      averageScore: null,
      highConcernReports: 0,
      latestReport: null,
    };
  }

  const totalScore = reports.reduce((sum, report) => sum + report.score, 0);

  const highConcernReports = reports.filter((report) => {
    const riskText = report.riskLevel.toLowerCase();

    return highConcernKeywords.some((keyword) => riskText.includes(keyword));
  }).length;

  const latestReport = [...reports].sort(
    (firstReport, secondReport) =>
      new Date(secondReport.createdAt).getTime() -
      new Date(firstReport.createdAt).getTime()
  )[0];

  return {
    totalReports: reports.length,
    averageScore: Math.round(totalScore / reports.length),
    highConcernReports,
    latestReport,
  };
};