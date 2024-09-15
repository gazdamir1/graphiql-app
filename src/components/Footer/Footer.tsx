import Image from "next/image";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/gazdamir1/graphiql-app/tree/develop"
        className={styles.githubLink}
      >
        GitHub
      </a>
      <div className={styles.year}>2024</div>
      <Image
        src="/rss-logo.svg"
        width={40}
        height={40}
        alt=""
        className={styles.courseLogo}
      />
    </footer>
  );
};

export default Footer;
