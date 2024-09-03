import styles from "./page.module.scss"

const signIn = () => {
  return (
    <main className={styles.main}>
      <div className={styles.signInBox}>
        <h2>Sign In / Sign Up</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  )
}

export default signIn
