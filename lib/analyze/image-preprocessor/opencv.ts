import cv from "@techstark/opencv-js";

let ready = false;

export async function ensureOpenCV(): Promise<typeof cv> {
  if (ready) {
    return cv;
  }

  if ((cv as any).onRuntimeInitialized) {
    await new Promise<void>((resolve) => {
      (cv as any).onRuntimeInitialized = () => {
        ready = true;
        resolve();
      };
    });
  } else {
    ready = true;
  }

  return cv;
}