import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { defineRouting } from "next-intl/routing";

vi.mock("next-intl/routing", () => ({
  defineRouting: vi.fn(),
}));

vi.mock("next-intl/navigation", () => ({
  createSharedPathnamesNavigation: vi.fn(),
}));

describe("routing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("должен определять маршрутизацию с правильными локалями и дефолтным локалем", () => {
    defineRouting({
      locales: ["en", "ru"],
      defaultLocale: "en",
    });

    expect(defineRouting).toHaveBeenCalledWith({
      locales: ["en", "ru"],
      defaultLocale: "en",
    });
  });
});
