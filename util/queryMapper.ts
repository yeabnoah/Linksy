export type LLMResponse = {
  action: string;
  criteria: {
    folder?: string;
    platform?: string;
    tags?: string[];
    search?: string;
  };
};

export function mapLLMResponseToAPIParams(
  llmResponse: LLMResponse
): URLSearchParams {
  const params = new URLSearchParams();

  if (llmResponse.criteria.folder)
    params.append("folder", llmResponse.criteria.folder);
  if (llmResponse.criteria.platform)
    params.append("platform", llmResponse.criteria.platform);
  if (llmResponse.criteria.tags)
    params.append("tags", llmResponse.criteria.tags.join(","));
  if (llmResponse.criteria.search)
    params.append("search", llmResponse.criteria.search);

  return params;
}
