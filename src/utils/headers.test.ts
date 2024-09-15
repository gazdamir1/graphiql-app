import { describe, it, expect } from "vitest"
import { removeHeader, updateHeader } from "./headers" // Замените на путь к вашему модулю

describe("updateHeader", () => {
  it("должен обновить ключ заголовка", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = updateHeader(headers, 1, "key", "Auth")
    expect(updatedHeaders).toEqual([
      { key: "Content-Type", value: "application/json" },
      { key: "Auth", value: "Bearer token" },
    ])
  })

  it("должен обновить значение заголовка", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = updateHeader(headers, 0, "value", "text/plain")
    expect(updatedHeaders).toEqual([
      { key: "Content-Type", value: "text/plain" },
      { key: "Authorization", value: "Bearer token" },
    ])
  })

  it("не должен изменять другие заголовки", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = updateHeader(headers, 1, "key", "Auth")
    expect(updatedHeaders[0]).toEqual({
      key: "Content-Type",
      value: "application/json",
    })
  })

  it("должен вернуть новый массив заголовков", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = updateHeader(headers, 1, "key", "Auth")
    expect(updatedHeaders).not.toBe(headers) // Проверяем, что возвращается новый массив
  })
})

describe("removeHeader", () => {
  it("должен удалить заголовок по индексу", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = removeHeader(headers, 0)
    expect(updatedHeaders).toEqual([
      { key: "Authorization", value: "Bearer token" },
    ])
  })

  it("не должен изменять другие заголовки", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = removeHeader(headers, 1)
    expect(updatedHeaders[0]).toEqual({
      key: "Content-Type",
      value: "application/json",
    })
  })

  it("должен вернуть новый массив заголовков", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = removeHeader(headers, 0)
    expect(updatedHeaders).not.toBe(headers) // Проверяем, что возвращается новый массив
  })

  it("должен вернуть пустой массив, если удалить единственный заголовок", () => {
    const headers = [{ key: "Content-Type", value: "application/json" }]
    const updatedHeaders = removeHeader(headers, 0)
    expect(updatedHeaders).toEqual([])
  })

  it("должен вернуть исходный массив, если индекс выходит за пределы", () => {
    const headers = [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ]
    const updatedHeaders = removeHeader(headers, 2)
    expect(updatedHeaders).toEqual(headers)
  })
})
