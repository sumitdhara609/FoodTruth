import { describe, expect, it } from "vitest";
import {
  getReportSourceContract,
  reportSourceContracts,
} from "@/lib/report/report-source-contract";

describe("report source contract", () => {
  it("defines save contracts for every report source", () => {
    expect(Object.keys(reportSourceContracts)).toEqual([
      "manual",
      "upload",
      "scan",
    ]);
  });

  it("keeps every source dependent on reviewed label data", () => {
    expect(
      Object.values(reportSourceContracts).every(
        (contract) => contract.requiresReviewedLabelData
      )
    ).toBe(true);
  });

  it("maps upload to the upload review save action", () => {
    expect(getReportSourceContract("upload").savePath).toBe(
      "app/analyze/upload/review/actions.ts"
    );
  });

  it("maps scan to the scan review save action", () => {
    expect(getReportSourceContract("scan").savePath).toBe(
      "app/analyze/scan/review/actions.ts"
    );
  });
});