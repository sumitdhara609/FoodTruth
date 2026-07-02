import { describe, expect, it } from "vitest";
import {
  createUploadSessionInputFromMimeType,
  createUploadSessionRecord,
  parseUploadSessionInput,
  serializeUploadSessionInput,
  serializeUploadSessionRecord,
  uploadSessionBridgeConfig,
} from "@/lib/analyze/upload-session-bridge";

describe("upload session bridge", () => {
  it("keeps temporary upload session privacy-safe", () => {
    expect(uploadSessionBridgeConfig.storesOriginalImage).toBe(false);
    expect(uploadSessionBridgeConfig.storesFileName).toBe(false);
    expect(uploadSessionBridgeConfig.storesFileSize).toBe(false);
    expect(uploadSessionBridgeConfig.storesTemporaryObjectUrl).toBe(true);
  });

  it("creates a temporary upload input from a supported mime type", () => {
    const result = createUploadSessionInputFromMimeType("image/png");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.input.mimeType).toBe("image/png");
      expect(result.input.originalImageStored).toBe(false);
    }
  });

  it("creates a temporary upload record with object URL", () => {
    const result = createUploadSessionRecord({
      mimeType: "image/jpeg",
      objectUrl: "blob:http://localhost/mock-image",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.objectUrl).toBe("blob:http://localhost/mock-image");
      expect(result.record?.fileNameStored).toBe(false);
      expect(result.record?.fileSizeStored).toBe(false);
      expect(result.record?.originalImageStored).toBe(false);
    }
  });

  it("rejects unsupported mime types", () => {
    const result = createUploadSessionInputFromMimeType("application/pdf");

    expect(result.success).toBe(false);
  });

  it("serializes and parses the temporary upload input", () => {
    const result = createUploadSessionInputFromMimeType("image/webp");

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    const serialized = serializeUploadSessionInput(result.input);
    const parsed = parseUploadSessionInput(serialized);

    expect(parsed.success).toBe(true);

    if (parsed.success) {
      expect(parsed.input.mimeType).toBe("image/webp");
      expect(parsed.input.fileNameStored).toBe(false);
      expect(parsed.input.fileSizeStored).toBe(false);
      expect(parsed.input.originalImageStored).toBe(false);
      expect(parsed.objectUrl).toBeNull();
      expect(parsed.record).toBeNull();
    }
  });

  it("serializes and parses the temporary upload record", () => {
    const result = createUploadSessionRecord({
      mimeType: "image/png",
      objectUrl: "blob:http://localhost/temporary-label",
    });

    expect(result.success).toBe(true);

    if (!result.success || !result.record) {
      return;
    }

    const serialized = serializeUploadSessionRecord(result.record);
    const parsed = parseUploadSessionInput(serialized);

    expect(parsed.success).toBe(true);

    if (parsed.success) {
      expect(parsed.input.mimeType).toBe("image/png");
      expect(parsed.objectUrl).toBe("blob:http://localhost/temporary-label");
      expect(parsed.record?.originalImageStored).toBe(false);
      expect(parsed.record?.fileNameStored).toBe(false);
      expect(parsed.record?.fileSizeStored).toBe(false);
    }
  });

  it("returns a clear message when no upload input exists", () => {
    const result = parseUploadSessionInput(null);

    expect(result.success).toBe(false);
    expect(result.message).toContain("No temporary upload input found");
  });
});