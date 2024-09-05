"use client";

import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

const GraphiQL = () => {
  const t = useTranslations();

  return (
    <div className={styles.graphiqlClientContainer}>
      <h2>GraphiQL {t("client")}</h2>
      <div className={styles.clientSection}>
        <div className={styles.inputGroup}>
          <label>{t("endpoint-URL")}:</label>
          <input type="text" placeholder={t("enter-endpoint-URL")} />
        </div>
        <div className={styles.inputGroup}>
          <label>{t("sdl-url")}:</label>
          <input type="text" placeholder={t("enter-sdl-url")} />
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
          <label>{t("query")}:</label>
          <textarea placeholder={t("graphql-query-editor")}></textarea>
        </div>
        <div className={styles.bodySection}>
          <label>{t("variables")}:</label>
          <textarea placeholder={t("variables-editor")}></textarea>
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
      <div className={styles.documentationSection}>
        <label>{t("documentation")}:</label>
        <textarea
          placeholder={t("visible-if-sdl-response-success")}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default GraphiQL;
