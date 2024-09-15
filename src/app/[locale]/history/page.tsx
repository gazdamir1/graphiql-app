"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

interface RequestHistoryItem {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  query?: string;
  variables?: string;
  timestamp: number;
  isGraphQL: boolean;
}

const History = () => {
  const t = useTranslations();
  const [history, setHistory] = useState<RequestHistoryItem[]>([]);
  const [filter, setFilter] = useState<"ALL" | "REST" | "GRAPHQL">("ALL");

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("requestHistory") || "[]"
    );
    const sortedHistory = storedHistory.sort(
      (a: RequestHistoryItem, b: RequestHistoryItem) =>
        b.timestamp - a.timestamp
    );
    setHistory(sortedHistory);
  }, []);

  const deleteRequestFromHistory = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("requestHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("requestHistory");
  };

  const filteredHistory = history.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "REST") return !item.isGraphQL;
    if (filter === "GRAPHQL") return item.isGraphQL;
  });

  const handleClick = (url: string) => {
    window.location.href = url;
  };

  const handleHistoryClick = (item: RequestHistoryItem) => {
    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/^\/(en|ru)/);
    const locale = localeMatch ? localeMatch[1] : null;
    const encodedUrl = btoa(item.url);
    const encodedQuery = item.query ? btoa(item.query) : "";
    const encodedVariables = item.variables ? btoa(item.variables) : "";
    const encodedHeaders = btoa(JSON.stringify(item.headers));

    if (item.isGraphQL) {
      const newUrl = `/${locale}/graphiql-client?url=${encodedUrl}&query=${encodedQuery}&variables=${encodedVariables}&headers=${encodedHeaders}`;
      window.location.href = newUrl;
    } else {
      const newUrl = `/${locale}/rest-client?method=${item.method}&url=${encodedUrl}&body=${encodedQuery}&variables=${encodedVariables}&headers=${encodedHeaders}`;
      window.location.href = newUrl;
    }
  };

  return (
    <div className={styles.historyPanelContainer}>
      <div className={styles.historyHeader}>
        <button
          className={`${styles.restButton}`}
          onClick={() => setFilter("ALL")}
        >
          {t("all")}
        </button>
        <button
          className={`${styles.restButton}`}
          onClick={() => setFilter("REST")}
        >
          REST
        </button>
        <button
          className={`${styles.graphiqlButton}`}
          onClick={() => setFilter("GRAPHQL")}
        >
          GraphQL
        </button>
      </div>
      <button onClick={clearHistory}>{t("clear-history")}</button>
      {filteredHistory.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{t("empty-history-message")}</p>
          <p>{t("empty-history-message2")}</p>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.restButton}
              onClick={() => handleClick("/rest-client")}
            >
              REST {t("client")}
            </button>
            <button
              type="button"
              className={styles.graphiqlButton}
              onClick={() => handleClick("/graphiql-client")}
            >
              GraphiQL {t("client")}
            </button>
          </div>
        </div>
      ) : (
        <ul className={styles.historyList}>
          {filteredHistory.map((item) => (
            <li key={item.id} className={styles.historyItem}>
              <span
                onClick={() => handleHistoryClick(item)}
                className={styles.historyItemLink}
              >
                {item.method} {item.url}
              </span>
              <span>{new Date(item.timestamp).toLocaleString()}</span>
              <button onClick={() => deleteRequestFromHistory(item.id)}>
                {t("delete-request")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
