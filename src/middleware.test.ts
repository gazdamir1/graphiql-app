import { describe, it, expect, vi } from "vitest";
import { middleware } from "./middleware";
import { NextRequest, NextResponse } from "next/server";

// Моки для NextRequest и NextResponse
vi.mock("next/server", () => {
  return {
    NextResponse: {
      redirect: vi.fn(),
      next: vi.fn(),
    },
  };
});

describe("middleware", () => {
  const createRequestMock = (
    url: string,
    cookies: Record<string, string> = {},
  ) => {
    return {
      nextUrl: { pathname: new URL(url).pathname },
      cookies: {
        get: (name: string) => {
          return { value: cookies[name] || null };
        },
      },
      url,
    } as unknown as NextRequest;
  };

  it("должен редиректить на /en, если локаль невалидна", () => {
    const req = createRequestMock("http://localhost/fr/some-path");

    middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/en/fr/some-path", req.url),
    );
  });

  it("должен редиректить на /en, если нет локали в пути", () => {
    const req = createRequestMock("http://localhost/some-path");

    middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/en/some-path", req.url),
    );
  });

  it("должен возвращать NextResponse.next для публичных страниц, если токен авторизации отсутствует", () => {
    const req = createRequestMock("http://localhost/en/sign-in");

    middleware(req);

    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("должен редиректить авторизованного пользователя с /sign-in на главную страницу", () => {
    const req = createRequestMock("http://localhost/en/sign-in", {
      authToken: "valid-token",
    });

    middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL("/en", req.url));
  });

  it("должен редиректить на /en/, если пользователь пытается зайти на защищенную страницу без токена", () => {
    const req = createRequestMock("http://localhost/en/rest-client");

    middleware(req);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/en/", req.url),
    );
  });

  it("должен разрешить доступ к защищённым страницам при наличии токена", () => {
    const req = createRequestMock("http://localhost/en/rest-client", {
      authToken: "valid-token",
    });

    middleware(req);

    expect(NextResponse.next).toHaveBeenCalled();
  });
});
