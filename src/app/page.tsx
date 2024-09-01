import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  if (false) {
    return (
      <div className={styles.homeContent}>
        <h1>Welcome Back, [Username] </h1>
        <div className={styles.navigation}>
          <Link href="/rest-client">Rest Client</Link>|
          <Link href="/graphiql-client">GraphiQL Client</Link>|
          <Link href="/history">History</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homeContent}>
      <h1>Welcome!</h1>
      <div className={styles.navigation}>
        <Link href="/sign-in">Sign In</Link>|
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}
