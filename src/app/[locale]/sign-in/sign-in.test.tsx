import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SignIn from "./page"
import { vi } from "vitest"
import "@testing-library/jest-dom" // Добавляем этот импорт

// Моки для функций
const mockSignInWithEmailAndPassword = async () => ({
  user: { uid: "test-user" },
})
const mockPush = vi.fn() // используем vi.fn() для мокирования
const mockT = (key: string) => key // Мок для функции useTranslations

// Мок для useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Мок для useTranslations
vi.mock("next-intl", () => ({
  useTranslations: () => mockT,
}))

// Мок для firebase/auth
vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal()
  if (typeof actual !== "object" || actual === null) {
    throw new Error("Expected 'actual' to be an object")
  }
  return {
    ...actual,
    getAuth: vi.fn(), // Мокаем getAuth
    signInWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue(mockSignInWithEmailAndPassword),
  }
})

describe("SignIn Component", () => {
  beforeEach(() => {
    vi.clearAllMocks() // Очищаем моки перед каждым тестом
  })

  it("должен отобразить форму входа", () => {
    render(<SignIn />)
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument()
  })

  it("должен показать ошибку при пустых полях", async () => {
    render(<SignIn />)
    fireEvent.submit(screen.getByRole("button"))
    await waitFor(() => {
      expect(screen.getByText("error-empty-fields")).toBeInTheDocument()
    })
  })

  //   it("должен перенаправить пользователя при успешном входе", async () => {
  //     // Мокаем успешный вход
  //     vi.mock("firebase/auth", async (importOriginal) => {
  //       const actual = await importOriginal()
  //       if (typeof actual !== "object" || actual === null) {
  //         throw new Error("Expected 'actual' to be an object")
  //       }
  //       return {
  //         ...actual,
  //         getAuth: vi.fn(), // Мокаем getAuth
  //         signInWithEmailAndPassword: vi
  //           .fn()
  //           .mockResolvedValue(mockSignInWithEmailAndPassword),
  //       }
  //     })
  //     render(<SignIn />)

  //     fireEvent.change(screen.getByPlaceholderText("email"), {
  //       target: { value: "test@test.com" },
  //     })
  //     fireEvent.change(screen.getByPlaceholderText("password"), {
  //       target: { value: "password123" },
  //     })
  //     fireEvent.submit(screen.getByRole("button"))

  //     // Увеличиваем время ожидания
  //     await waitFor(
  //       () => {
  //         console.log("Checking mockPush call...")
  //         expect(mockPush).toHaveBeenCalledWith("/") // Проверяем, что был вызван push
  //       },
  //       { timeout: 5000 } // Увеличиваем таймаут до 5 секунд
  //     )
  //   })

  it("должен показать ошибку при неправильном пароле", async () => {
    // Мокаем ошибку Firebase
    vi.mock("firebase/auth", async (importOriginal) => {
      const actual = await importOriginal()
      if (typeof actual !== "object" || actual === null) {
        throw new Error("Expected 'actual' to be an object")
      }
      return {
        ...actual,
        getAuth: vi.fn(), // Мокаем getAuth
        signInWithEmailAndPassword: vi.fn().mockRejectedValue({
          code: "auth/wrong-password",
        }),
      }
    })
    render(<SignIn />)

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@test.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "wrongpassword" },
    })
    fireEvent.submit(screen.getByRole("button"))

    await waitFor(() => {
      expect(screen.getByText("error-wrong-password")).toBeInTheDocument()
    })
  })
})
