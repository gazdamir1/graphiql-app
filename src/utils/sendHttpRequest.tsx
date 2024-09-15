import { saveRequestToHistory } from "./saveRequestToHistory";

export const SendHttpRequest = async ({
  url,
  method = "POST",
  body = "",
  query = "",
  headers = [],
  variables = "",
  sdlUrl = "",
  setResponseStatus,
  setResponseBody,
  setDocumentation,
}: {
  url: string;
  method?: string;
  body?: string;
  query?: string;
  headers: { key: string; value: string }[];
  variables?: string;
  sdlUrl?: string;
  setResponseStatus: (status: string) => void;
  setResponseBody: (body: string) => void;
  setDocumentation?: (data: string) => void;
}) => {
  const encodeBase64 = (str: string) => btoa(str);

  try {
    const encodedUrl = encodeBase64(url);
    const bodyObject = {
      query: query || "",
      variables: variables || {},
    };
    const encodedBody = encodeBase64(JSON.stringify(bodyObject));
    const headersQuery = headers
      .map(
        ({ key, value }) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    let routeUrl = `/${method}/${encodedUrl}`;
    if (method !== "GET" && encodedBody) {
      routeUrl += `/${encodedBody}`;
    }
    if (headersQuery) {
      routeUrl += `?${headersQuery}`;
    }

    window.history.pushState(null, "", routeUrl);

    const fetchOptions: RequestInit = {
      method,
      headers: Object.fromEntries(
        headers.map(({ key, value }) => [key, value])
      ),
    };

    if (method !== "GET" && method !== "HEAD") {
      fetchOptions.body = JSON.stringify({
        body: body ? body : undefined,
        query: method === "POST" ? query : undefined,
        variables: variables ? JSON.parse(variables) : {},
      });
    }

    const response = await fetch(url, fetchOptions);

    console.log(response);

    setResponseStatus(`${response.status} ${response.statusText}`);
    const responseData = await response.text();

    if (response.headers.get("Content-Type")?.includes("application/json")) {
      setResponseBody(JSON.stringify(JSON.parse(responseData), null, 2));
    } else {
      setResponseBody(responseData);
    }

    if (sdlUrl && response.ok && method === "POST") {
      const sdlResponse = await fetch(sdlUrl);
      const sdlData = await sdlResponse.text();
      setDocumentation?.(sdlData);
    } else {
      setDocumentation?.("");
    }

    saveRequestToHistory(
      method,
      url,
      headers,
      query,
      variables,
      method === "POST"
    );
  } catch (error) {
    console.log(error);
    setResponseStatus("Error");
    setResponseBody(JSON.stringify(error));
  }
};
