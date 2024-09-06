"use client"

import styles from "./page.module.scss"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { auth } from "./authorization/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function Home() {
  const t = useTranslations()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Проверка состояния аутентификации и получение email текущего пользователя
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email) // Устанавливаем email пользователя
      } else {
        setEmail(null) // Если пользователь не аутентифицирован
      }
    })

    // Очистка подписки на изменения состояния аутентификации
    return () => unsubscribe()
  }, [])

  return (
    <div className={styles.homeContent}>
      {email ? (
        <>
          <h1>
            {t("second-greeting")}, {email}
          </h1>
          <div className={styles.navigation}>
            <Link href="/rest-client">Rest {t("client")}</Link>|
            <Link href="/graphiql-client">GraphiQL {t("client")}</Link>|
            <Link href="/history">{t("history")}</Link>
          </div>
        </>
      ) : (
        <div className={styles.homeContent}>
          <h1>{t("greeting")}!</h1>
          <div className={styles.navigation}>
            <Link href="/sign-in">{t("sign-in")}</Link>|
            <Link href="/sign-up">{t("sign-up")}</Link>
          </div>
        </div>
      )}
    </div>
  )
}
