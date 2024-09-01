"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import LangToggler from "../LangToggler/LangToggler";
import { useEffect, useState } from "react";

const Header = () => {
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
      <Image src="/team-logo.svg" alt="" width={30} height={30} />
      <div className={styles.languageToggle}>
        <LangToggler />
      </div>
      <div className={styles.signNavigation}>
        <Link href="/sign-in">Sign-in</Link>|
        <Link href="/sign-up">Sign-up</Link>
      </div>
    </header>
  );
};

export default Header;
