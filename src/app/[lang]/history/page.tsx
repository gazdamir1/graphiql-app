"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { useTranslation } from "react-i18next"

const History = () => {
  const { t } = useTranslation("common")

  if (false) {
    return (
      <div className={styles.historyPanelContainer}>
        <>
          <div className={styles.historyHeader}>
            <h2>History Requests</h2>
          </div>
          <div className={styles.historyList}>
            <div className={styles.historyItem}></div>
          </div>
        </>
      </div>
    )
  } else {
    return (
      <div className={styles.emptyState}>
        <p>{t("empty-history-message")}</p>
        <p>{t("empty-history-message2")}:</p>
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.restButton}>
            REST {t("client")}
          </button>
          <button type="button" className={styles.graphiqlButton}>
            GraphiQL {t("client")}
          </button>
        </div>
      </div>
    )
  }
}

export default History
