import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Rest from "./page";
import { SendHttpRequest } from "@/utils/sendHttpRequest";
import "@testing-library/jest-dom";

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

describe("Rest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.search = "";
  });

  afterEach(() => {
    vi.clearAllMocks();
    window.location.search = "";
  });

  it("должен отображать заголовок и кнопку отправки запроса", () => {
    render(<Rest />);
    expect(screen.getByText("REST client")).toBeInTheDocument();
    expect(screen.getByText("send-request")).toBeInTheDocument();
  });

  it("должен отправлять запрос при нажатии на кнопку", () => {
    render(<Rest />);

    fireEvent.change(screen.getByPlaceholderText("endpoint-URL"), {
      target: { value: "https://example.com/api" },
    });
    fireEvent.change(screen.getByPlaceholderText("json/text-editor"), {
      target: { value: '{"query":"query { user { id name } }"}' },
    });
    fireEvent.change(screen.getByPlaceholderText("variables-editor"), {
      target: { value: '{"id":1}' },
    });

    fireEvent.click(screen.getByText("send-request"));

    expect(SendHttpRequest).toHaveBeenCalledWith({
      url: "https://example.com/api",
      method: "GET",
      query: '{"query":"query { user { id name } }"}',
      headers: [{ key: "", value: "" }],
      variables: '{"id":1}',
      setResponseStatus: expect.any(Function),
      setResponseBody: expect.any(Function),
    });
  });
});
