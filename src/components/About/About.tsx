import React from "react";
import styles from "./About.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations();
  return (
    <div className={styles.about}>
      <div className={styles.aboutTitle}>
        <p>{t("about")}</p>
        <p>{t("about2")}</p>
      </div>
      <div className={styles.personsTitle}>{t("team")}</div>
      <div className={styles.persons}>
        <div className={styles.person}>
          <Image
            src="/damir-Icon.jpg"
            alt=""
            width={100}
            height={100}
            className={styles.personIcon}
          />
          <p>{t("damir")}</p>
          <p>{t("job")}</p>
          <a href="https://github.com/gazdamir1">
            https://github.com/gazdamir1
          </a>
        </div>
        <div className={styles.person}>
          <Image
            src="/boris-Icon.jpg"
            alt=""
            width={100}
            height={100}
            className={styles.personIcon}
          />
          <p>{t("boris")}</p>
          <p>{t("job2")}</p>
          <a href="https://github.com/SleptsovBoris">
            https://github.com/SleptsovBoris
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
