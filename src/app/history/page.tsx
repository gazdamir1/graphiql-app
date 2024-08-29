import { useState } from "react"
import styles from "./page.module.scss"

const history = () => {
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
        <p>You haven&apos;t executed any requests</p>
        <p>It&apos;s empty here. Try:</p>
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.restButton}>
            REST Client
          </button>
          <button type="button" className={styles.graphiqlButton}>
            GraphiQL Client
          </button>
        </div>
      </div>
    )
  }
}

export default history
