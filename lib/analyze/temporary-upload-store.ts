let temporaryUploadFile: File | null = null;

export function setTemporaryUploadFile(file: File): void {
  temporaryUploadFile = file;
}

export function getTemporaryUploadFile(): File | null {
  return temporaryUploadFile;
}

export function hasTemporaryUploadFile(): boolean {
  return temporaryUploadFile !== null;
}

export function clearTemporaryUploadFile(): void {
  temporaryUploadFile = null;
}