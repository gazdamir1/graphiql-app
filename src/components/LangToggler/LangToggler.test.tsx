import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LangToggler from "./LangToggler";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import "@testing-library/jest-dom";

vi.mock("@/i18n/routing", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock("next-intl", () => ({
  useLocale: vi.fn(),
}));

interface MockRouter {
  push: (href: string, options?: { locale?: string }) => void;
  replace: (href: string, options?: { locale?: string }) => void;
  prefetch: (href: string) => Promise<void>;
  back: () => void;
  forward: () => void;
  refresh: () => void;
}

describe("LangToggler", () => {
  const mockReplace = vi.fn();
  const mockPathname = "/test-path";

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: vi.fn(),
      replace: mockReplace,
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    } as MockRouter);
    vi.mocked(usePathname).mockReturnValue(mockPathname);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("должен переключать язык на русский, если текущий язык английский", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<LangToggler />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockReplace).toHaveBeenCalledWith(mockPathname, { locale: "ru" });
  });

  it("должен переключать язык на английский, если текущий язык русский", () => {
    vi.mocked(useLocale).mockReturnValue("ru");
    render(<LangToggler />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(mockReplace).toHaveBeenCalledWith(mockPathname, { locale: "en" });
  });

  it("должен корректно отображать состояние чекбокса в зависимости от текущего языка", () => {
    vi.mocked(useLocale).mockReturnValue("en");
    render(<LangToggler />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked();

    vi.mocked(useLocale).mockReturnValue("ru");
    render(<LangToggler />);
    const checkboxesRu = screen.getAllByRole("checkbox");
    expect(checkboxesRu[0]).toBeChecked();
  });
});
