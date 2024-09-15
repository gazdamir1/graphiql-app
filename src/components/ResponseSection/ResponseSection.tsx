import { useTranslations } from "next-intl";
import styles from "./ResponceSection.module.scss";

type Props = {
  responseStatus: string;
  responseBody: string;
};

const ResponseSection = (props: Props) => {
  const t = useTranslations();
  return (
    <div className={styles.responseSection}>
      <label>{t("status")}:</label>
      <input
        className={styles.status}
        type="text"
        value={props.responseStatus}
        placeholder={t("http-status-code")}
        readOnly
      />
      <label>{t("body")}:</label>
      <textarea
        value={props.responseBody}
        placeholder={t("read-only-json-viewer")}
        readOnly
      ></textarea>
    </div>
  );
};

export default ResponseSection;
