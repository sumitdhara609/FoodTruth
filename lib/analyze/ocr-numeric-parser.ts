export type OcrNumericMatch = {
  label: string;
  value: string;
};

const escapeRegExp = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const normalizeOcrNumber = (value: string) => {
  return value.replace(",", ".").trim();
};

export const findNumberAfterAnyLabel = ({
  text,
  labels,
}: {
  text: string;
  labels: string[];
}): OcrNumericMatch | null => {
  for (const label of labels) {
    const escapedLabel = escapeRegExp(label);

    const pattern = new RegExp(
      `${escapedLabel}\\s*:?\\s*([0-9]+(?:[\\.,][0-9]+)?)\\s*(?:g|gm|grams|mg|kcal|cal)?`,
      "i"
    );

    const match = text.match(pattern);

    if (match?.[1]) {
      return {
        label,
        value: normalizeOcrNumber(match[1]),
      };
    }
  }

  return null;
};

export const findNumberAfterLabel = (text: string, label: string) => {
  return findNumberAfterAnyLabel({ text, labels: [label] })?.value ?? "";
};