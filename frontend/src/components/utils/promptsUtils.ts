export const makeTruncatedPromptContent = (
  content: string,
  maxLength?: number
) => {
  const DEFAULT_MAX_CONTENT_LENGTH = 100;
  const maxContentLength = maxLength || DEFAULT_MAX_CONTENT_LENGTH;

  if (content.length > maxContentLength) {
    return content.substring(0, maxContentLength) + "...";
  }

  return content;
};
