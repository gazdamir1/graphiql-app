"use client";

import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

const SignIn = () => {
  const t = useTranslations();
  return (
    <main className={styles.main}>
      <div className={styles.signInBox}>
        <h2>{t("sign-in")}</h2>
        <form>
          <input type="email" placeholder={t("email")} required />
          <input type="password" placeholder={t("password")} required />
          <button type="submit">{t("submit")}</button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
