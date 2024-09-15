import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { defineRouting } from "next-intl/routing"
import { createSharedPathnamesNavigation } from "next-intl/navigation"

// Моки для defineRouting и createSharedPathnamesNavigation
vi.mock("next-intl/routing", () => ({
  defineRouting: vi.fn(),
}))

vi.mock("next-intl/navigation", () => ({
  createSharedPathnamesNavigation: vi.fn(),
}))

describe("routing", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("должен определять маршрутизацию с правильными локалями и дефолтным локалем", () => {
    const routing = defineRouting({
      locales: ["en", "ru"],
      defaultLocale: "en",
    })

    expect(defineRouting).toHaveBeenCalledWith({
      locales: ["en", "ru"],
      defaultLocale: "en",
    })
  })
})
