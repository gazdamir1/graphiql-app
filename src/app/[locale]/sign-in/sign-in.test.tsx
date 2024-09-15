import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "./page";
import { vi } from "vitest";
import "@testing-library/jest-dom";

const mockSignInWithEmailAndPassword = async () => ({
  user: { uid: "test-user" },
});
const mockPush = vi.fn();
const mockT = (key: string) => key;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => mockT,
}));

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();
  if (typeof actual !== "object" || actual === null) {
    throw new Error("Expected 'actual' to be an object");
  }
  return {
    ...actual,
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue(mockSignInWithEmailAndPassword),
  };
});

describe("SignIn Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен отобразить форму входа", () => {
    render(<SignIn />);
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });

  it("должен показать ошибку при пустых полях", async () => {
    render(<SignIn />);
    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByText("error-empty-fields")).toBeInTheDocument();
    });
  });

  it("должен показать ошибку при неправильном пароле", async () => {
    vi.mock("firebase/auth", async (importOriginal) => {
      const actual = await importOriginal();
      if (typeof actual !== "object" || actual === null) {
        throw new Error("Expected 'actual' to be an object");
      }
      return {
        ...actual,
        getAuth: vi.fn(),
        signInWithEmailAndPassword: vi.fn().mockRejectedValue({
          code: "auth/wrong-password",
        }),
      };
    });
    render(<SignIn />);

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("error-wrong-password")).toBeInTheDocument();
    });
  });
});
