"use client"

import { useState } from "react"
import { auth } from "../authorization/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import styles from "./page.module.scss"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"

const SignUp = () => {
  const t = useTranslations()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null) // Для хранения сообщений об ошибках
  const [success, setSuccess] = useState<boolean>(false) // Для хранения статуса успешной регистрации
  const router = useRouter()

  // Функция для проверки валидности пароля
  const isValidPassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Валидация данных на клиенте
    if (!email || !password) {
      setError(t("error-empty-fields"))
      return
    }

    if (!isValidPassword(password)) {
      setError(t("error-weak-password")) // Убедитесь, что это сообщение определено в ваших переводах
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log("User signed up:", user)
      setSuccess(true) // Успешная регистрация
      setError(null) // Очистка предыдущих ошибок
      router.push("/") // Перенаправление на домашнюю страницу после успешной регистрации
    } catch (error: any) {
      // Обработка ошибок аутентификации
      if (error.code === "auth/email-already-in-use") {
        setError(t("error-email-already-in-use"))
      } else if (error.code === "auth/invalid-email") {
        setError(t("error-invalid-email"))

        //TODO: Добавить разные проверки на сложность пароля
      } else if (error.code === "auth/weak-password") {
        setError(t("error-weak-password"))
      } else {
        setError(t("error-sign-up")) // Общее сообщение об ошибке
      }
      console.error("Error signing up:", error)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.signInBox}>
        <h2>{t("sign-up")}</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{t("submit")}</button>
          {error && <p className={styles.error}>{error}</p>}{" "}
          {/* Отображение сообщений об ошибках */}
          {success && (
            <p className={styles.success}>{t("success-sign-up")}</p>
          )}{" "}
          {/* Отображение успешного сообщения */}
        </form>
      </div>
    </main>
  )
}

export default SignUp
