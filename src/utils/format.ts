export function formatDate(date?: string | Date | null) {
  if (!date || date === "0001-01-01T00:00:00Z") {
    return "-";
  }
  const formatDate = new Date(date);
  return `${
    formatDate.getUTCMonth() + 1
  }/${formatDate.getUTCDate()}/${formatDate.getUTCFullYear()}`;
}

export function formatDatePST(date: string) {
  if (!date) {
    return "";
  }
  const day = new Date(date);
  return `${day.toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
  })} PST`;
}

// For KB -> MB, MB -> GB, etc.
export function formatSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(0)} KB`;
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  }
  return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

export function bytesToMB(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function convertToSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

export function capitalizeFirstLetter(name: string | undefined) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}
