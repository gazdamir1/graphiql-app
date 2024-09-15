import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GraphiQL from "./page";
import { SendHttpRequest } from "@/utils/sendHttpRequest";
import "@testing-library/jest-dom"; // Импортируйте это

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/utils/sendHttpRequest", () => ({
  SendHttpRequest: vi.fn(),
}));

vi.mock("@/components/HttpHeaders/HttpHeaders", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/ResponseSection/ResponseSection", () => ({
  default: vi.fn(),
}));

describe("GraphiQL", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.search = "";
  });

  afterEach(() => {
    vi.clearAllMocks();
    window.location.search = "";
  });

  it("должен отображать заголовок и кнопку отправки запроса", () => {
    render(<GraphiQL />);
    expect(screen.getByText("GraphiQL client")).toBeInTheDocument();
    expect(screen.getByText("send-request")).toBeInTheDocument();
  });

  it("должен отправлять запрос при нажатии на кнопку", () => {
    render(<GraphiQL />);

    fireEvent.change(screen.getByPlaceholderText("enter-endpoint-URL"), {
      target: { value: "https://example.com/graphql" },
    });
    fireEvent.change(screen.getByPlaceholderText("graphql-query-editor"), {
      target: { value: '{"query":"query { user { id name } }"}' },
    });
    fireEvent.change(screen.getByPlaceholderText("variables-editor"), {
      target: { value: '{"id":1}' },
    });

    fireEvent.click(screen.getByText("send-request"));

    expect(SendHttpRequest).toHaveBeenCalledWith({
      url: "https://example.com/graphql",
      method: "POST",
      query: '{"query":"query { user { id name } }"}',
      headers: [{ key: "", value: "" }],
      variables: '{"id":1}',
      sdlUrl: "https://example.com/graphql?sdl",
      setResponseStatus: expect.any(Function),
      setResponseBody: expect.any(Function),
      setDocumentation: expect.any(Function),
    });
  });
});
