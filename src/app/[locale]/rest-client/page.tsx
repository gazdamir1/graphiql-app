"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import ResponseSection from "@/components/ResponseSection/ResponseSection";
import { SendHttpRequest } from "@/utils/sendHttpRequest";
import HttpHeaders from "@/components/HttpHeaders/HttpHeaders";

const Rest = () => {
  const t = useTranslations();
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [query, setQuery] = useState("");
  const [variables, setVariables] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [responseBody, setResponseBody] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const methodParam = params.get("method");
    const urlParam = params.get("url");
    const bodyParam = params.get("query");
    const variablesParam = params.get("variables");
    const headersParam = params.get("headers");

    if (methodParam) setMethod(methodParam);
    if (urlParam) setUrl(atob(urlParam));
    if (bodyParam) setQuery(atob(bodyParam));
    if (variablesParam) setVariables(atob(variablesParam));
    if (headersParam) {
      try {
        const decodedHeaders = JSON.parse(atob(headersParam));
        const formattedHeaders = Object.entries(decodedHeaders).map(
          ([key, value]) => ({ key, value: String(value) }),
        );
        setHeaders(formattedHeaders);
      } catch (error) {
        console.error("Error parsing headers:", error);
      }
    }
  }, []);

  const sendRequest = () => {
    SendHttpRequest({
      url,
      method,
      query,
      headers,
      variables,
      setResponseStatus,
      setResponseBody,
    });
  };

  return (
    <div className={styles.restClientContainer}>
      <h2>REST {t("client")}</h2>
      <div className={styles.requestSection}>
        <div className={styles.methodUrl}>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            placeholder={t("endpoint-URL")}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <HttpHeaders headers={headers} setHeaders={setHeaders} />

        <div className={styles.bodySection}>
          <label>{t("body")}:</label>
          <textarea
            placeholder={t("json/text-editor")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.bodySection}>
          <label>{t("variables")}:</label>
          <textarea
            placeholder={t("variables-editor")}
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
          ></textarea>
        </div>
        <button onClick={sendRequest}>{t("send-request")}</button>
      </div>

      <ResponseSection
        responseStatus={responseStatus}
        responseBody={responseBody}
      />
    </div>
  );
};

export default Rest;
