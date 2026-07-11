declare global {
  interface Window {
    cv: any;
  }
}

let loadingPromise: Promise<any> | null = null;

export async function ensureOpenCV(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("OpenCV can only run in the browser.");
  }

  if (window.cv && window.cv.Mat) {
    return window.cv;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[data-opencv="true"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => resolve(window.cv));
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");

    script.src = "/opencv/opencv.js";
    script.async = true;
    script.dataset.opencv = "true";

    script.onload = () => {
      const wait = () => {
        if (
          window.cv &&
          window.cv.Mat &&
          window.cv.imread
        ) {
          resolve(window.cv);
        } else {
          setTimeout(wait, 50);
        }
      };

      wait();
    };

    script.onerror = reject;

    document.body.appendChild(script);
  });

  return loadingPromise;
}