"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../authorization/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { FirebaseError } from "firebase/app";

const SignUp = () => {
  const t = useTranslations();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const validatePassword = (password: string): string | null => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push(t("error-password-length"));
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(t("error-password-uppercase"));
    }
    if (!/[a-z]/.test(password)) {
      errors.push(t("error-password-lowercase"));
    }
    if (!/\d/.test(password)) {
      errors.push(t("error-password-number"));
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push(t("error-password-special-char"));
    }

    return errors.length > 0 ? errors.join(", ") : null;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t("error-empty-fields"));
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      setSuccess(true);
      setError(null);
      document.cookie = "authToken=fakeToken123; path=/";
      router.push("/");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setError(t("error-email-already-in-use"));
          break;
        case "auth/invalid-email":
          setError(t("error-invalid-email"));
          break;
        case "auth/weak-password":
          setError(t("error-weak-password"));
          break;
        default:
          setError(t("error-sign-up"));
          break;
      }
      console.error("Error signing up:", firebaseError);
    }
  };

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
          {error && (
            <p className={styles.error}>
              {t("error-password-message")}
              {error}
            </p>
          )}
          {success && <p className={styles.success}>{t("success-sign-up")}</p>}
        </form>
      </div>
    </main>
  );
};

export default SignUp;
