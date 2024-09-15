"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import ResponseSection from "@/components/ResponseSection/ResponseSection";
import { SendHttpRequest } from "@/utils/sendHttpRequest";
import HttpHeaders from "@/components/HttpHeaders/HttpHeaders";

const GraphiQL = () => {
  const t = useTranslations();
  const [url, setUrl] = useState("");
  const [sdlUrl, setSdlUrl] = useState("");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [query, setQuery] = useState("");
  const [variables, setVariables] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const [documentation, setDocumentation] = useState("");

  const sendRequest = () => {
    SendHttpRequest({
      url,
      method: "POST",
      query,
      headers,
      variables,
      sdlUrl,
      setResponseStatus,
      setResponseBody,
      setDocumentation,
    });
  };

  useEffect(() => {
    if (url) {
      setSdlUrl(`${url}?sdl`);
    }
  }, [url]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const encodedUrl = searchParams.get("url");
    const encodedQuery = searchParams.get("query");
    const encodedVariables = searchParams.get("variables");
    const headersParam = searchParams.get("headers");

    if (encodedUrl) setUrl(atob(encodedUrl));
    if (encodedQuery) {
      const decodedQuery = atob(encodedQuery).replace(/\\n/g, "\n");
      setQuery(decodedQuery);
    }
    if (encodedVariables) setVariables(atob(encodedVariables));
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

  return (
    <div className={styles.graphiqlClientContainer}>
      <h2>GraphiQL {t("client")}</h2>
      <div className={styles.clientSection}>
        <div className={styles.inputGroup}>
          <label>{t("endpoint-URL")}:</label>
          <input
            type="text"
            placeholder={t("enter-endpoint-URL")}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>{t("sdl-url")}:</label>
          <input
            type="text"
            placeholder={t("enter-sdl-url")}
            value={sdlUrl}
            onChange={(e) => setSdlUrl(e.target.value)}
          />
        </div>

        <HttpHeaders headers={headers} setHeaders={setHeaders} />

        <div className={styles.bodySection}>
          <label>{t("query")}:</label>
          <textarea
            placeholder={t("graphql-query-editor")}
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

      {documentation && (
        <div className={styles.documentationSection}>
          <label>{t("documentation")}:</label>
          <textarea
            value={documentation}
            placeholder={t("visible-if-sdl-response-success")}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default GraphiQL;
