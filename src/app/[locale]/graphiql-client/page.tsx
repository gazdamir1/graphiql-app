"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import ResponseSection from "@/components/ResponseSection/ResponseSection";

interface RequestHistoryItem {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  timestamp: number;
  isGraphQL: boolean;
}

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

  useEffect(() => {
    if (url) {
      setSdlUrl(`${url}?sdl`);
    }
  }, [url]);

  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const saveRequestToHistory = () => {
    const request: RequestHistoryItem = {
      id: generateUniqueId(),
      method: "POST",
      url,
      headers: Object.fromEntries(
        headers.map(({ key, value }) => [key, value])
      ),
      body: JSON.stringify({
        query,
        variables: variables ? JSON.parse(variables) : {},
      }),
      timestamp: Date.now(),
      isGraphQL: true,
    };
    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]");
    history.push(request);
    localStorage.setItem("requestHistory", JSON.stringify(history));
  };

  const sendRequest = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: Object.fromEntries(
          headers.map(({ key, value }) => [key, value])
        ),
        body: JSON.stringify({
          query,
          variables: variables ? JSON.parse(variables) : {},
        }),
      });

      setResponseStatus(`${response.status} ${response.statusText}`);
      const responseData = await response.text();

      if (response.headers.get("Content-Type")?.includes("application/json")) {
        setResponseBody(JSON.stringify(JSON.parse(responseData), null, 2));
      } else {
        setResponseBody(responseData);
      }

      if (response.ok) {
        const sdlResponse = await fetch(sdlUrl);
        const sdlData = await sdlResponse.text();
        setDocumentation(sdlData);
      } else {
        setDocumentation("");
      }

      saveRequestToHistory();
    } catch (error) {
      setResponseStatus("Error");
      setResponseBody(JSON.stringify(error));
    }
  };

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
        <div className={styles.headersSection}>
          <label>{t("headers")}:</label>
          <button
            type="button"
            onClick={() => setHeaders([...headers, { key: "", value: "" }])}
          >
            {t("add-header")}
          </button>
          {headers.map((header, index) => (
            <div key={index} className={styles.headerRow}>
              <input
                type="text"
                placeholder={t("header-key")}
                value={header.key}
                onChange={(e) => {
                  const newHeaders = [...headers];
                  newHeaders[index].key = e.target.value;
                  setHeaders(newHeaders);
                }}
              />
              <input
                type="text"
                placeholder={t("header-value")}
                value={header.value}
                onChange={(e) => {
                  const newHeaders = [...headers];
                  newHeaders[index].value = e.target.value;
                  setHeaders(newHeaders);
                }}
              />
              <button
                onClick={() =>
                  setHeaders(headers.filter((_, i) => i !== index))
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className={styles.bodySection}>
          <label>{t("query")}:</label>
          <textarea
            // TODO: Поменять textarea на крутой редактор, или же сделать стили для textarea
            placeholder={t("graphql-query-editor")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.bodySection}>
          <label>{t("variables")}:</label>
          <textarea
            // TODO: поменять textarea на крутой редактор, или же сделать стили для textarea
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
