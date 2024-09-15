import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SignUp from "./page"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { vi } from "vitest"
import "@testing-library/jest-dom" // Добавляем этот импорт

// Моки для функций
const mockCreateUserWithEmailAndPassword = async () => ({
  user: { uid: "test-user" },
})
const mockPush = vi.fn() // используем vi.fn() для мокирования
const mockT = (key: string) => key // Мок для функции useTranslations

// Мок для useRouter
vi.mock("@/i18n/routing", () => ({
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
    createUserWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue(mockCreateUserWithEmailAndPassword),
  }
})

describe("SignUp Component", () => {
  beforeEach(() => {
    vi.clearAllMocks() // Очищаем моки перед каждым тестом
  })

  it("должен отобразить форму регистрации", () => {
    render(<SignUp />)
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument()
  })

  it("должен показать ошибку при пустых полях", async () => {
    render(<SignUp />)
    fireEvent.submit(screen.getByRole("button"))
    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes("error-empty-fields"))
      ).toBeInTheDocument()
    })
  })

  //   it("должен показать ошибку при невалидном пароле", async () => {
  //     render(<SignUp />)
  //     fireEvent.change(screen.getByPlaceholderText("email"), {
  //       target: { value: "test@test.com" },
  //     })
  //     fireEvent.change(screen.getByPlaceholderText("password"), {
  //       target: { value: "weak" },
  //     })
  //     fireEvent.submit(screen.getByRole("button"))

  //     await waitFor(() => {
  //       const errorElement = screen.getByText((content) =>
  //         content.includes("error-password-message")
  //       )
  //       console.log("Error element:", errorElement.textContent)

  //       expect(errorElement).toBeInTheDocument()
  //       expect(errorElement).toHaveTextContent("error-password-length")
  //       expect(errorElement).toHaveTextContent("error-password-uppercase")
  //       expect(errorElement).toHaveTextContent("error-password-lowercase")
  //       expect(errorElement).toHaveTextContent("error-password-number")
  //       expect(errorElement).toHaveTextContent("error-password-special-char")
  //     })
  //   })

  //   it("должен перенаправить пользователя при успешной регистрации", async () => {
  //     // Мокаем успешную регистрацию
  //     vi.mock("firebase/auth", async (importOriginal) => {
  //       const actual = await importOriginal()
  //       if (typeof actual !== "object" || actual === null) {
  //         throw new Error("Expected 'actual' to be an object")
  //       }
  //       return {
  //         ...actual,
  //         getAuth: vi.fn(), // Мокаем getAuth
  //         createUserWithEmailAndPassword: vi
  //           .fn()
  //           .mockResolvedValue(mockCreateUserWithEmailAndPassword),
  //       }
  //     })
  //     render(<SignUp />)

  //     fireEvent.change(screen.getByPlaceholderText("email"), {
  //       target: { value: "test@test.com" },
  //     })
  //     fireEvent.change(screen.getByPlaceholderText("password"), {
  //       target: { value: "StrongPassword123!" },
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

  it("должен показать ошибку при использовании существующего email", async () => {
    // Мокаем ошибку Firebase
    vi.mock("firebase/auth", async (importOriginal) => {
      const actual = await importOriginal()
      if (typeof actual !== "object" || actual === null) {
        throw new Error("Expected 'actual' to be an object")
      }
      return {
        ...actual,
        getAuth: vi.fn(), // Мокаем getAuth
        createUserWithEmailAndPassword: vi.fn().mockRejectedValue({
          code: "auth/email-already-in-use",
        }),
      }
    })
    render(<SignUp />)

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@test.com" },
    })
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "StrongPassword123!" },
    })
    fireEvent.submit(screen.getByRole("button"))

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes("error-email-already-in-use")
        )
      ).toBeInTheDocument()
    })
  })
})
