"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import styles from "./LangToggler.module.scss";
import { useLocale } from "next-intl";

const LangToggler = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isEnglish, setIsEnglish] = useState(locale === "en");

  useEffect(() => {
    setIsEnglish(locale === "en");
  }, [locale]);

  const changeLanguage = (locale: "en" | "ru" | undefined) => {
    router.replace(pathname, { locale });
  };

  const handleToggle = () => {
    const newLocale = isEnglish ? "ru" : "en";
    changeLanguage(newLocale);
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
