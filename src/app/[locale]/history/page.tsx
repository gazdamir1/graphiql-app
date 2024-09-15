"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";

interface RequestHistoryItem {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: {
    query?: string;
    variables?: string;
  };
  timestamp: number;
  isGraphQL: boolean;
}

const History = () => {
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

  const handleHistoryClick = (item: RequestHistoryItem) => {
    const encodedUrl = btoa(item.url);
    const encodedQuery = item.body?.query ? btoa(item.body.query) : "";
    const encodedVariables = item.body?.variables
      ? btoa(item.body.variables)
      : "";
    const encodedHeaders = btoa(JSON.stringify(item.headers));

    if (item.isGraphQL) {
      const newUrl = `/en/graphiql-client?url=${encodedUrl}&query=${encodedQuery}&variables=${encodedVariables}&headers=${encodedHeaders}`;
      window.location.href = newUrl;
    } else {
      const newUrl = `/en/rest-client?method=${item.method}&url=${encodedUrl}&body=${encodedQuery}&variables=${encodedVariables}&headers=${encodedHeaders}`;
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
          Все
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
      <button onClick={clearHistory}>Очистить всю историю</button>
      {filteredHistory.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Здесь пока ничего нет. Выполните запрос для начала.</p>
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
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
