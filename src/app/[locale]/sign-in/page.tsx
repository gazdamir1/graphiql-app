"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../authorization/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

const SignIn = () => {
  const t = useTranslations();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError(t("error-empty-fields"));
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);
      document.cookie = "authToken=fakeToken123; path=/";
      router.push("/");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case "auth/user-not-found":
          setError(t("error-user-not-found"));
          break;
        case "auth/wrong-password":
          setError(t("error-wrong-password"));
          break;
        case "auth/invalid-email":
          setError(t("error-invalid-email"));
          break;
        default:
          setError(t("error-sign-in"));
          break;
      }
      console.error("Error signing in:", firebaseError);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.signInBox}>
        <h2>{t("sign-in")}</h2>
        <form onSubmit={handleSignIn}>
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
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default SignIn;
