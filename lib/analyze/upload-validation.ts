import {
  isAcceptedLabelImageType,
  isWithinLabelUploadSizeLimit,
  MAX_LABEL_UPLOAD_SIZE_MB,
} from "@/lib/account/report-storage-policy";

export type UploadValidationResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export type UploadCandidate = {
  type: string;
  size: number;
};

export const validateLabelUploadCandidate = (
  file: UploadCandidate
): UploadValidationResult => {
  if (!isAcceptedLabelImageType(file.type)) {
    return {
      success: false,
      message: "Use a JPG, PNG, or WEBP label image.",
    };
  }

  if (!isWithinLabelUploadSizeLimit(file.size)) {
    return {
      success: false,
      message: `Keep the label image under ${MAX_LABEL_UPLOAD_SIZE_MB} MB.`,
    };
  }

  return {
    success: true,
  };
};