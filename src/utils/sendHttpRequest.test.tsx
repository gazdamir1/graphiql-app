import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { SendHttpRequest } from "./sendHttpRequest" // Замените на путь к вашему модулю

describe("SendHttpRequest", () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  //   it("должен отправить запрос и сохранить его в историю", async () => {
  //     const url = "https://example.com/graphql"
  //     const method = "POST"
  //     const headers = [
  //       { key: "Content-Type", value: "application/json" },
  //       { key: "Authorization", value: "Bearer token" },
  //     ]
  //     const query = `query { user { id name } }`
  //     const variables = JSON.stringify({ id: 1 })
  //     const setResponseStatus = vi.fn()
  //     const setResponseBody = vi.fn()
  //     const setDocumentation = vi.fn()

  //     await SendHttpRequest({
  //       url,
  //       method,
  //       headers,
  //       query,
  //       variables,
  //       setResponseStatus,
  //       setResponseBody,
  //       setDocumentation,
  //     })

  //     const history = JSON.parse(localStorage.getItem("requestHistory") || "[]")
  //     expect(history.length).toBe(1)
  //     expect(history[0]).toMatchObject({
  //       method,
  //       url,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer token",
  //       },
  //       body: JSON.stringify({
  //         query,
  //         variables: { id: 1 },
  //       }),
  //       isGraphQL: true,
  //     })

  //     expect(setResponseStatus).toHaveBeenCalledWith("200 OK")
  //     expect(setResponseBody).toHaveBeenCalledWith(
  //       JSON.stringify({ data: "mocked response" }, null, 2)
  //     )
  //     expect(setDocumentation).not.toHaveBeenCalled()
  //   })

  //   it("должен отправить запрос с sdlUrl и сохранить документацию", async () => {
  //     const url = "https://example.com/graphql"
  //     const method = "POST"
  //     const headers = [
  //       { key: "Content-Type", value: "application/json" },
  //       { key: "Authorization", value: "Bearer token" },
  //     ]
  //     const query = `query { user { id name } }`
  //     const variables = JSON.stringify({ id: 1 })
  //     const sdlUrl = "https://example.com/sdl"
  //     const setResponseStatus = vi.fn()
  //     const setResponseBody = vi.fn()
  //     const setDocumentation = vi.fn()

  //     // Мок для sdlUrl
  //     global.fetch = vi.fn().mockImplementation((fetchUrl) => {
  //       if (fetchUrl === sdlUrl) {
  //         return {
  //           status: 200,
  //           statusText: "OK",
  //           headers: new Headers({ "Content-Type": "text/plain" }),
  //           text: async () => "mocked sdl data",
  //         } as Response
  //       }
  //       return {
  //         status: 200,
  //         statusText: "OK",
  //         headers: new Headers({ "Content-Type": "application/json" }),
  //         text: async () => JSON.stringify({ data: "mocked response" }),
  //         json: async () => ({ data: "mocked response" }),
  //       } as Response
  //     })

  //     await SendHttpRequest({
  //       url,
  //       method,
  //       headers,
  //       query,
  //       variables,
  //       sdlUrl,
  //       setResponseStatus,
  //       setResponseBody,
  //       setDocumentation,
  //     })

  //     const history = JSON.parse(localStorage.getItem("requestHistory") || "[]")
  //     expect(history.length).toBe(1)
  //     expect(history[0]).toMatchObject({
  //       method,
  //       url,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer token",
  //       },
  //       body: JSON.stringify({
  //         query,
  //         variables: { id: 1 },
  //       }),
  //       isGraphQL: true,
  //     })

  //     expect(setResponseStatus).toHaveBeenCalledWith("200 OK")
  //     expect(setResponseBody).toHaveBeenCalledWith(
  //       JSON.stringify({ data: "mocked response" }, null, 2)
  //     )
  //     expect(setDocumentation).toHaveBeenCalledWith("mocked sdl data")
  //   })

  it("должен обработать ошибку при отправке запроса", async () => {
    const url = "https://example.com/graphql"
    const method = "POST"
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const query = `query { user { id name } }`
    const variables = JSON.stringify({ id: 1 })
    const setResponseStatus = vi.fn()
    const setResponseBody = vi.fn()
    const setDocumentation = vi.fn()

    // Мок для ошибки
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    await SendHttpRequest({
      url,
      method,
      headers,
      query,
      variables,
      setResponseStatus,
      setResponseBody,
      setDocumentation,
    })

    expect(setResponseStatus).toHaveBeenCalledWith("Error")
    expect(setResponseBody).toHaveBeenCalledWith(
      JSON.stringify(new Error("Network error"))
    )
    expect(setDocumentation).not.toHaveBeenCalled()
  })
})
