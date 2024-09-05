"use client";

import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

const Rest = () => {
  const t = useTranslations();
  return (
    <div className={styles.restClientContainer}>
      <h2>REST {t("client")}</h2>
      <div className={styles.requestSection}>
        <div className={styles.methodUrl}>
          <select>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input type="text" placeholder={t("endpoint-URL")} />
        </div>

        <div className={styles.headersSection}>
          <label>{t("headers")}:</label>
          <button type="button">{t("add-header")}</button>
          <div className={styles.headerRow}>
            <input type="text" placeholder={t("header-key")} />
            <input type="text" placeholder={t("header-value")} />
          </div>
        </div>

        <div className={styles.bodySection}>
          <label>{t("body")}:</label>
          <textarea placeholder={t("json/text-editor")}></textarea>
        </div>
      </div>
      <div className={styles.responseSection}>
        <label>{t("status")}:</label>
        <input
          className={styles.status}
          type="text"
          placeholder={t("http-status-code")}
          readOnly
        />
        <label>{t("body")}:</label>
        <textarea placeholder={t("read-only-json-viewer")} readOnly></textarea>
      </div>
    </div>
  );
};

export default Rest;
