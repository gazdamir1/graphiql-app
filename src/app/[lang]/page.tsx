"use client";

import styles from "./page.module.scss";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("common");

  if (false) {
    return (
      <div className={styles.homeContent}>
        <h1>Welcome Back, [Username] </h1>
        <div className={styles.navigation}>
          <Link href="/rest-client">Rest Client</Link>|
          <Link href="/graphiql-client">GraphiQL Client</Link>|
          <Link href="/history">History</Link>
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
