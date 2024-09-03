import styles from "./page.module.scss"

const rest = () => {
  return (
    <div className={styles.restClientContainer}>
      <h2>REST Client</h2>
      <div className={styles.requestSection}>
        <div className={styles.methodUrl}>
          <select>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input type="text" placeholder="Endpoint URL" />
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
          <label>Body:</label>
          <textarea placeholder="JSON/Text Editor"></textarea>
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
    </div>
  )
}

export default rest
