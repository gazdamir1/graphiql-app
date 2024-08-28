import styles from "./LangToggler.module.scss";

const LangToggler = () => {
  return (
    <div className={styles.toggleButton}>
      <input type="checkbox" className={styles.checkbox} />
      <div className={styles.knobs}></div>
      <div className={styles.layer}></div>
    </div>
  );
};

export default LangToggler;
