"use client";

import styles from "./page.module.scss";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  if (true) {
    return (
      <div className={styles.homeContent}>
        <h1>{t("second-greeting")}, [Username] </h1>
        <div className={styles.navigation}>
          <Link href="/rest-client">Rest {t("client")}</Link>|
          <Link href="/graphiql-client">GraphiQL {t("client")}</Link>|
          <Link href="/history">{t("history")}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homeContent}>
      <h1>{t("greeting")}!</h1>
      <div className={styles.navigation}>
        <Link href="/sign-in">{t("sign-in")}</Link>|
        <Link href="/sign-up">{t("sign-up")}</Link>
      </div>
    </div>
  );
}
