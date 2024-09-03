"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import styles from "./LangToggler.module.scss";

const LangToggler = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const [isEnglish, setIsEnglish] = useState(i18n.language === "en");

  useEffect(() => {
    setIsEnglish(i18n.language === "en");
  }, [i18n.language]);

  const changeLanguage = (locale: string) => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    if (["en", "ru"].includes(segments[0])) {
      segments.shift();
    }
    const newPath = `/${locale}/${segments.join("/")}`;
    i18n.changeLanguage(locale);
    router.push(newPath);
  };

  const handleToggle = () => {
    const newLocale = isEnglish ? "ru" : "en";
    changeLanguage(newLocale);
    setIsEnglish(!isEnglish);
  };

  return (
    <div className={styles.toggleButton} onClick={handleToggle}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isEnglish}
        onChange={handleToggle}
      />
      <div className={styles.knobs}></div>
      <div className={styles.layer}></div>
    </div>
  );
};

export default LangToggler;
