"use client"

import { useTranslation } from "react-i18next"
import styles from "./page.module.scss"
const SignUp = () => {
  const { t } = useTranslation("common")
  return (
    <main className={styles.main}>
      <div className={styles.signInBox}>
        <h2>{t("sign-up")}</h2>
        <form>
          <input type="email" placeholder={t("email")} required />
          <input type="password" placeholder={t("password")} required />
          <button type="submit">{t("submit")}</button>
        </form>
      </div>
    </main>
  )
}

export default SignUp
