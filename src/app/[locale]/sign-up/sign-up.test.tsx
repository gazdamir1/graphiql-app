import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./page";
import { vi } from "vitest";
import "@testing-library/jest-dom";

const mockCreateUserWithEmailAndPassword = async () => ({
  user: { uid: "test-user" },
});
const mockPush = vi.fn();
const mockT = (key: string) => key;

vi.mock("@/i18n/routing", () => ({
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
    createUserWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue(mockCreateUserWithEmailAndPassword),
  };
});

describe("SignUp Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен отобразить форму регистрации", () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });

  it("должен показать ошибку при пустых полях", async () => {
    render(<SignUp />);
    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes("error-empty-fields")),
      ).toBeInTheDocument();
    });
  });

  it("должен показать ошибку при использовании существующего email", async () => {
    vi.mock("firebase/auth", async (importOriginal) => {
      const actual = await importOriginal();
      if (typeof actual !== "object" || actual === null) {
        throw new Error("Expected 'actual' to be an object");
      }
      return {
        ...actual,
        getAuth: vi.fn(),
        createUserWithEmailAndPassword: vi.fn().mockRejectedValue({
          code: "auth/email-already-in-use",
        }),
      };
    });
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "StrongPassword123!" },
    });
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes("error-email-already-in-use"),
        ),
      ).toBeInTheDocument();
    });
  });
});
