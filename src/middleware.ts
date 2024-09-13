import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const localeMatch = pathname.match(/^\/(en|ru)/)
  const locale = localeMatch ? localeMatch[1] : null

  const authToken = req.cookies.get("authToken")?.value

  const isValidLocale = locale === "en" || locale === "ru"
  if (!isValidLocale) {
    if (locale === null) {
      return NextResponse.redirect(new URL(`/en/${pathname}`, req.url))
    }
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url))
  }

  if (
    pathname === "/" ||
    pathname.startsWith(`/${locale}/sign-in`) ||
    pathname.startsWith(`/${locale}/sign-up`)
  ) {
    if (
      authToken &&
      (pathname.startsWith(`/${locale}/sign-in`) ||
        pathname.startsWith(`/${locale}/sign-up`))
    ) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url))
    }
    return NextResponse.next()
  }

  const protectedPages = [
    `/${locale}/rest-client`,
    `/${locale}/graphiql-client`,
    `/${locale}/history`,
  ]
  if (protectedPages.some((page) => pathname.startsWith(page))) {
    if (!authToken) {
      return NextResponse.redirect(new URL(`/${locale}/`, req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/(en|ru)/:path*"],
}
