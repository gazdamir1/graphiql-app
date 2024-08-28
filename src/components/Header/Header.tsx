import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import LangToggler from "../LangToggler/LangToggler";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src="/team-logo.svg" alt="" width={30} height={30} />
      <div className={styles.languageToggle}>
        <LangToggler />
      </div>
      <div className={styles.signNavigation}>
        <Link href="/sign-in">Sign-in</Link>|
        <Link href="/sign-up">Sign-up</Link>
      </div>
    </header>
  );
};

export default Header;
