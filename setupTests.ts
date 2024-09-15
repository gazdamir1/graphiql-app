import "@testing-library/jest-dom"
// setupTests.ts

global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input.toString()
  return {
    status: 200,
    statusText: "OK",
    headers: new Headers({ "Content-Type": "application/json" }),
    text: async () => JSON.stringify({ data: "mocked response" }),
    json: async () => ({ data: "mocked response" }),
  } as Response
}

// Мок для localStorage
const localStorageMock = (function () {
  let store: { [key: string]: string } = {}

  return {
    getItem(key: string) {
      return store[key] || null
    },
    setItem(key: string, value: string) {
      store[key] = value.toString()
    },
    removeItem(key: string) {
      delete store[key]
    },
    clear() {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})
