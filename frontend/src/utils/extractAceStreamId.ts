export const extractAceStreamId = (contentId: string): string | null => {
  const trimmed = contentId.trim();
  const id = trimmed.replaceAll("acestream://", "");

  return id.length == 40 ? id : null;
};
