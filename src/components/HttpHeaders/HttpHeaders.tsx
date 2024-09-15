import { useTranslations } from "next-intl";
import styles from "./HttpHeaders.module.scss";
import { removeHeader, updateHeader } from "@/utils/headers";

type Props = {
  headers: { key: string; value: string }[];
  setHeaders: (headers: { key: string; value: string }[]) => void;
};

const HttpHeaders = (props: Props) => {
  const t = useTranslations();
  return (
    <div className={styles.headersSection}>
      <label>{t("headers")}:</label>
      <button
        type="button"
        onClick={() =>
          props.setHeaders([...props.headers, { key: "", value: "" }])
        }
      >
        {t("add-header")}
      </button>
      {props.headers.map((header, index) => (
        <div key={index} className={styles.headerRow}>
          <input
            type="text"
            placeholder={t("header-key")}
            value={header.key}
            onChange={(e) => {
              props.setHeaders(
                updateHeader(props.headers, index, "key", e.target.value),
              );
            }}
          />
          <input
            type="text"
            placeholder={t("header-value")}
            value={header.value}
            onChange={(e) => {
              props.setHeaders(
                updateHeader(props.headers, index, "value", e.target.value),
              );
            }}
          />
          <button
            onClick={() => props.setHeaders(removeHeader(props.headers, index))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default HttpHeaders;
