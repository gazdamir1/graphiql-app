"use client";

import { Link } from "@/i18n/routing";
import styles from "./Header.module.scss";
import Image from "next/image";
import LangToggler from "../LangToggler/LangToggler";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <Link href="/">
        <Image src="/team-logo.svg" alt="Logo" width={30} height={30} />
      </Link>

      <div className={styles.languageToggle}>
        <LangToggler />
      </div>

      <div className={styles.signNavigation}>
        <Link href="/sign-in">{t("sign-in")}</Link>|
        <Link href="/sign-up">{t("sign-up")}</Link>
      </div>
    </header>
  );
};

export default Header;
