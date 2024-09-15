"use client";

import { Link } from "@/i18n/routing";
import styles from "./Header.module.scss";
import Image from "next/image";
import LangToggler from "../LangToggler/LangToggler";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/authorization/firebase";

const Header = () => {
  const t = useTranslations();
  const [isSticky, setSticky] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = "authToken=; Max-Age=0; path=/";
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <Link href="/" className={styles.logoWrapper}>
        <Image src="/team-logo.svg" alt="Logo" width={30} height={30} />
      </Link>

      <div className={styles.languageToggle}>
        <LangToggler />
      </div>

      <div className={styles.signNavigation}>
        {user ? (
          <div className={styles.signNav} onClick={handleLogout}>
            {t("logout")}
          </div>
        ) : (
          <>
            <Link href="/sign-in" className={styles.signNav}>
              {t("sign-in")}
            </Link>
            |
            <Link href="/sign-up" className={styles.signNav}>
              {t("sign-up")}
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
