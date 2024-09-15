interface RequestHistoryItem {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  query?: string;
  variables?: string;
  timestamp: number;
  isGraphQL: boolean;
}

const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const saveRequestToHistory = (
  method: string,
  url: string,
  headers: { key: string; value: string }[],
  query: string,
  variables: string,
  isGraphQL: boolean
) => {
  const request: RequestHistoryItem = {
    id: generateUniqueId(),
    method,
    url,
    headers: Object.fromEntries(headers.map(({ key, value }) => [key, value])),
    query,
    variables: variables ? JSON.parse(variables) : null,
    timestamp: Date.now(),
    isGraphQL,
  };
  const history = JSON.parse(localStorage.getItem("requestHistory") || "[]");
  history.push(request);
  localStorage.setItem("requestHistory", JSON.stringify(history));
};
