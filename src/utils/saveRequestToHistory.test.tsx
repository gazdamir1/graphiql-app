import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { saveRequestToHistory } from "./saveRequestToHistory" // Замените на путь к вашему модулю

describe("saveRequestToHistory", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it("должен сохранить запрос в историю", () => {
    const method = "POST"
    const url = "https://example.com/graphql"
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const query = `query { user { id name } }`
    const variables = JSON.stringify({ id: 1 })
    const isGraphQL = true

    saveRequestToHistory(method, url, headers, query, variables, isGraphQL)

    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]")
    expect(history.length).toBe(1)
    expect(history[0]).toMatchObject({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
      body: JSON.stringify({
        query,
        variables: { id: 1 },
      }),
      isGraphQL,
    })
  })

  it("должен сохранить несколько запросов в историю", () => {
    const method1 = "POST"
    const url1 = "https://example.com/graphql"
    const headers1 = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const query1 = `query { user { id name } }`
    const variables1 = JSON.stringify({ id: 1 })
    const isGraphQL1 = true

    const method2 = "GET"
    const url2 = "https://example.com/api"
    const headers2 = [{ key: "Content-Type", value: "application/json" }]
    const query2 = ""
    const variables2 = ""
    const isGraphQL2 = false

    saveRequestToHistory(
      method1,
      url1,
      headers1,
      query1,
      variables1,
      isGraphQL1
    )
    saveRequestToHistory(
      method2,
      url2,
      headers2,
      query2,
      variables2,
      isGraphQL2
    )

    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]")
    expect(history.length).toBe(2)
    expect(history[0]).toMatchObject({
      method: method1,
      url: url1,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
      body: JSON.stringify({
        query: query1,
        variables: { id: 1 },
      }),
      isGraphQL: isGraphQL1,
    })
    expect(history[1]).toMatchObject({
      method: method2,
      url: url2,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query2,
        variables: {},
      }),
      isGraphQL: isGraphQL2,
    })
  })

  it("должен сохранить запрос без переменных", () => {
    const method = "POST"
    const url = "https://example.com/graphql"
    const headers = [{ key: "Content-Type", value: "application/json" }]
    const query = `query { user { id name } }`
    const variables = ""
    const isGraphQL = true

    saveRequestToHistory(method, url, headers, query, variables, isGraphQL)

    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]")
    expect(history.length).toBe(1)
    expect(history[0]).toMatchObject({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
      isGraphQL,
    })
  })

  it("должен сохранить запрос без заголовков", () => {
    const method = "POST"
    const url = "https://example.com/graphql"
    const headers: { key: string; value: string }[] = []
    const query = `query { user { id name } }`
    const variables = JSON.stringify({ id: 1 })
    const isGraphQL = true

    saveRequestToHistory(method, url, headers, query, variables, isGraphQL)

    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]")
    expect(history.length).toBe(1)
    expect(history[0]).toMatchObject({
      method,
      url,
      headers: {},
      body: JSON.stringify({
        query,
        variables: { id: 1 },
      }),
      isGraphQL,
    })
  })
})
