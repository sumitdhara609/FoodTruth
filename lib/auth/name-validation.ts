export const normalizeDisplayName = (nameInput: string) => {
  return nameInput.trim().replace(/\s+/g, " ");
};

export const getFirstName = (name: string | null | undefined) => {
  const normalizedName = normalizeDisplayName(name ?? "");

  if (!normalizedName) {
    return "there";
  }

  return normalizedName.split(" ")[0];
};