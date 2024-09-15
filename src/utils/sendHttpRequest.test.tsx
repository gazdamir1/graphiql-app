import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SendHttpRequest } from "./sendHttpRequest";

describe("SendHttpRequest", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("должен обработать ошибку при отправке запроса", async () => {
    const url = "https://example.com/graphql";
    const method = "POST";
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ];
    const query = `query { user { id name } }`;
    const variables = JSON.stringify({ id: 1 });
    const setResponseStatus = vi.fn();
    const setResponseBody = vi.fn();
    const setDocumentation = vi.fn();

    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    await SendHttpRequest({
      url,
      method,
      headers,
      query,
      variables,
      setResponseStatus,
      setResponseBody,
      setDocumentation,
    });

    expect(setResponseStatus).toHaveBeenCalledWith("Error");
    expect(setResponseBody).toHaveBeenCalledWith(
      JSON.stringify(new Error("Network error")),
    );
    expect(setDocumentation).not.toHaveBeenCalled();
  });
});
