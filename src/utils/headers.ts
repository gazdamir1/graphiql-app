export const updateHeader = (
  headers: { key: string; value: string }[],
  index: number,
  keyOrValue: "key" | "value",
  value: string
) => {
  const newHeaders = headers.map((header, i) =>
    i === index ? { ...header, [keyOrValue]: value } : header
  );
  return newHeaders;
};

export const removeHeader = (
  headers: { key: string; value: string }[],
  index: number
) => {
  return headers.filter((_, i) => i !== index);
};
