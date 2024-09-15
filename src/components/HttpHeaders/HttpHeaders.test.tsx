import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HttpHeaders from "./HttpHeaders";
import { removeHeader, updateHeader } from "@/utils/headers";

// Моки для useTranslations
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Моки для функций removeHeader и updateHeader
vi.mock("@/utils/headers", () => ({
  removeHeader: vi.fn(),
  updateHeader: vi.fn(),
}));

describe("HttpHeaders", () => {
  const mockSetHeaders = vi.fn();
  const mockHeaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Authorization", value: "Bearer token" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("должен отображать заголовки", () => {
    render(<HttpHeaders headers={mockHeaders} setHeaders={mockSetHeaders} />);
    expect(screen.getByText("headers:")).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("header-key").length).toBe(2);
    expect(screen.getAllByPlaceholderText("header-value").length).toBe(2);
  });

  it("должен добавлять новый заголовок при нажатии на кнопку 'add-header'", () => {
    render(<HttpHeaders headers={mockHeaders} setHeaders={mockSetHeaders} />);
    fireEvent.click(screen.getByText("add-header"));
    expect(mockSetHeaders).toHaveBeenCalledWith([
      ...mockHeaders,
      { key: "", value: "" },
    ]);
  });

  it("должен обновлять ключ заголовка при изменении значения в поле ввода", () => {
    render(<HttpHeaders headers={mockHeaders} setHeaders={mockSetHeaders} />);
    fireEvent.change(screen.getAllByPlaceholderText("header-key")[0], {
      target: { value: "New-Key" },
    });
    expect(updateHeader).toHaveBeenCalledWith(mockHeaders, 0, "key", "New-Key");
    expect(mockSetHeaders).toHaveBeenCalledWith(
      updateHeader(mockHeaders, 0, "key", "New-Key"),
    );
  });

  it("должен обновлять значение заголовка при изменении значения в поле ввода", () => {
    render(<HttpHeaders headers={mockHeaders} setHeaders={mockSetHeaders} />);
    fireEvent.change(screen.getAllByPlaceholderText("header-value")[0], {
      target: { value: "New-Value" },
    });
    expect(updateHeader).toHaveBeenCalledWith(
      mockHeaders,
      0,
      "value",
      "New-Value",
    );
    expect(mockSetHeaders).toHaveBeenCalledWith(
      updateHeader(mockHeaders, 0, "value", "New-Value"),
    );
  });

  it("должен удалять заголовок при нажатии на кнопку 'Remove'", () => {
    render(<HttpHeaders headers={mockHeaders} setHeaders={mockSetHeaders} />);
    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(removeHeader).toHaveBeenCalledWith(mockHeaders, 0);
    expect(mockSetHeaders).toHaveBeenCalledWith(removeHeader(mockHeaders, 0));
  });
});
