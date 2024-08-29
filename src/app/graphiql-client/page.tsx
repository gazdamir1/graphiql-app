import styles from "./page.module.scss"

const graphiQL = () => {
  return (
    <div className={styles.graphiqlClientContainer}>
      <h2>GraphiQL Client</h2>
      <div className={styles.clientSection}>
        <div className={styles.inputGroup}>
          <label>Endpoint URL:</label>
          <input type="text" placeholder="Enter Endpoint URL" />
        </div>
        <div className={styles.inputGroup}>
          <label>SDL URL:</label>
          <input type="text" placeholder="Enter SDL URL" />
        </div>
        <div className={styles.headersSection}>
          <label>Headers:</label>
          <button type="button">Add Header</button>
          <div className={styles.headerRow}>
            <input type="text" placeholder="Header Key" />
            <input type="text" placeholder="Header Value" />
          </div>
        </div>
        <div className={styles.bodySection}>
          <label>Query:</label>
          <textarea placeholder="GraphQL Query Editor"></textarea>
        </div>
        <div className={styles.bodySection}>
          <label>Variables:</label>
          <textarea placeholder="Variables Editor"></textarea>
        </div>
      </div>
      <div className={styles.responseSection}>
        <label>Status:</label>
        <input
          className={styles.status}
          type="text"
          placeholder="HTTP Status Code"
          readOnly
        />
        <label>Body:</label>
        <textarea placeholder="Read-Only JSON Viewer" readOnly></textarea>
      </div>
      <div className={styles.documentationSection}>
        <label>Documentation:</label>
        <textarea
          placeholder="Visible if SDL Response Success"
          readOnly
        ></textarea>
      </div>
    </div>
  )
}

export default graphiQL
