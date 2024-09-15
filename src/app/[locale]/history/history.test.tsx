import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import History from "./page"
import { useTranslations } from "next-intl"
import "@testing-library/jest-dom" // Импортируйте это

// Моки для useTranslations
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}))

describe("History", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it("должен отображать заголовок и кнопки фильтрации", () => {
    render(<History />)
    expect(screen.getByText("all")).toBeInTheDocument()
    expect(screen.getByText("REST")).toBeInTheDocument()
    expect(screen.getByText("GraphQL")).toBeInTheDocument()
    expect(screen.getByText("clear-history")).toBeInTheDocument()
  })

  it("должен отображать пустое состояние, если история пуста", () => {
    render(<History />)
    expect(screen.getByText("empty-history-message")).toBeInTheDocument()
    expect(screen.getByText("empty-history-message2")).toBeInTheDocument()
  })

  it("должен отображать историю запросов", () => {
    const mockHistory = [
      {
        id: "1",
        method: "GET",
        url: "https://example.com/api",
        headers: { "Content-Type": "application/json" },
        query: '{"query":"query { user { id name } }"}',
        variables: '{"id":1}',
        timestamp: Date.now(),
        isGraphQL: false,
      },
      {
        id: "2",
        method: "POST",
        url: "https://example.com/graphql",
        headers: { "Content-Type": "application/json" },
        query: '{"query":"query { user { id name } }"}',
        variables: '{"id":1}',
        timestamp: Date.now(),
        isGraphQL: true,
      },
    ]
    localStorage.setItem("requestHistory", JSON.stringify(mockHistory))

    render(<History />)

    expect(screen.getByText("GET https://example.com/api")).toBeInTheDocument()
    expect(
      screen.getByText("POST https://example.com/graphql")
    ).toBeInTheDocument()
  })

  it("должен фильтровать историю запросов по типу", () => {
    const mockHistory = [
      {
        id: "1",
        method: "GET",
        url: "https://example.com/api",
        headers: { "Content-Type": "application/json" },
        query: '{"query":"query { user { id name } }"}',
        variables: '{"id":1}',
        timestamp: Date.now(),
        isGraphQL: false,
      },
      {
        id: "2",
        method: "POST",
        url: "https://example.com/graphql",
        headers: { "Content-Type": "application/json" },
        query: '{"query":"query { user { id name } }"}',
        variables: '{"id":1}',
        timestamp: Date.now(),
        isGraphQL: true,
      },
    ]
    localStorage.setItem("requestHistory", JSON.stringify(mockHistory))

    render(<History />)

    fireEvent.click(screen.getByText("REST"))
    expect(screen.getByText("GET https://example.com/api")).toBeInTheDocument()
    expect(screen.queryByText("POST https://example.com/graphql")).toBeNull()

    fireEvent.click(screen.getByText("GraphQL"))
    expect(
      screen.getByText("POST https://example.com/graphql")
    ).toBeInTheDocument()
    expect(screen.queryByText("GET https://example.com/api")).toBeNull()
  })

  it("должен удалять запрос из истории", () => {
    const mockHistory = [
      {
        id: "1",
        method: "GET",
        url: "https://example.com/api",
        headers: { "Content-Type": "application/json" },
        query: '{"query":"query { user { id name } }"}',
        variables: '{"id":1}',
        timestamp: Date.now(),
        isGraphQL: false,
      },
    ]
    localStorage.setItem("requestHistory", JSON.stringify(mockHistory))

    render(<History />)

    fireEvent.click(screen.getByText("delete-request"))
    expect(screen.queryByText("GET https://example.com/api")).toBeNull()
  })

  it("должен очищать историю", () => {
    const mockHistory = [
      {
        id: "1",
        method: "GET",
        url: "https://example.com/api",
        headers: { "Content-Type": "application/json" },
        query: '{"query":"query { user { id name } }"}',
        variables: '{"id":1}',
        timestamp: Date.now(),
        isGraphQL: false,
      },
    ]
    localStorage.setItem("requestHistory", JSON.stringify(mockHistory))

    render(<History />)

    fireEvent.click(screen.getByText("clear-history"))
    expect(screen.queryByText("GET https://example.com/api")).toBeNull()
  })
})
