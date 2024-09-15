import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import ResponseSection from "./ResponseSection"
import "@testing-library/jest-dom" // Импортируйте это

// Моки для useTranslations
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}))

describe("ResponseSection", () => {
  const mockResponseStatus = "200 OK"
  const mockResponseBody = '{"message": "Success"}'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("должен отображать статус ответа", () => {
    render(
      <ResponseSection
        responseStatus={mockResponseStatus}
        responseBody={mockResponseBody}
      />
    )
    expect(screen.getByText("status:")).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockResponseStatus)).toBeInTheDocument()
  })

  it("должен отображать тело ответа", () => {
    render(
      <ResponseSection
        responseStatus={mockResponseStatus}
        responseBody={mockResponseBody}
      />
    )
    expect(screen.getByText("body:")).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockResponseBody)).toBeInTheDocument()
  })

  it("должен отображать плейсхолдеры для статуса и тела ответа", () => {
    render(<ResponseSection responseStatus="" responseBody="" />)
    expect(screen.getByPlaceholderText("http-status-code")).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText("read-only-json-viewer")
    ).toBeInTheDocument()
  })
})
