"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/i18next";
import { useRouter } from "next/navigation";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
