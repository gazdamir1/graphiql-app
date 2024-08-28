import Link from "next/link";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Main.module.scss";

const Main = () => {
  if (false) {
    return (
      <div className={styles.mainContent}>
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
    <div className={styles.mainContent}>
      <h1>Welcome!</h1>
      <div className={styles.navigation}>
        <Link href="/sign-in">Sign In</Link>|
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};

export default Main;
