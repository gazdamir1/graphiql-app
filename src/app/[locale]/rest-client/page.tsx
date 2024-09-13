"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import { useTranslations } from "next-intl"
import ResponseSection from "@/components/ResponseSection/ResponseSection"

interface RequestHistoryItem {
  id: string
  method: string
  url: string
  headers: Record<string, string>
  body?: string
  timestamp: number
  isGraphQL: boolean
}

const Rest = () => {
  const t = useTranslations()

  // Состояния
  const [method, setMethod] = useState("GET")
  const [url, setUrl] = useState("")
  const [headers, setHeaders] = useState([{ key: "", value: "" }])
  const [body, setBody] = useState("")
  const [responseStatus, setResponseStatus] = useState("")
  const [responseBody, setResponseBody] = useState("")

  // Функции для работы с заголовками
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }])
  }

  const updateHeader = (
    index: number,
    keyOrValue: "key" | "value",
    value: string
  ) => {
    const newHeaders = headers.map((header, i) =>
      i === index ? { ...header, [keyOrValue]: value } : header
    )
    setHeaders(newHeaders)
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  // Генерация уникального идентификатора
  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9)
  }

  // Кодирование в base64
  const encodeBase64 = (str: string) => {
    return btoa(str)
  }

  // Декодирование из base64
  const decodeBase64 = (str: string) => {
    return atob(str)
  }

  // Сохранение запроса в историю
  const saveRequestToHistory = () => {
    const request: RequestHistoryItem = {
      id: generateUniqueId(),
      method,
      url,
      headers: Object.fromEntries(
        headers.map(({ key, value }) => [key, value])
      ),
      body,
      timestamp: Date.now(),
      isGraphQL: false, // Измените это значение при необходимости
    }
    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]")
    history.push(request)
    localStorage.setItem("requestHistory", JSON.stringify(history))
  }

  // Отправка запроса
  const sendRequest = async () => {
    try {
      const response = await fetch(url, {
        method,
        headers: Object.fromEntries(
          headers.map(({ key, value }) => [key, value])
        ),
        body: body ? JSON.stringify(JSON.parse(body)) : undefined,
      })

      setResponseStatus(`${response.status} ${response.statusText}`)

      const contentType = response.headers.get("Content-Type")
      let responseData = await response.text()

      // Проверяем, является ли ответ JSON
      if (contentType && contentType.includes("application/json")) {
        try {
          // Парсим JSON и форматируем его
          const json = JSON.parse(responseData)
          responseData = JSON.stringify(json, null, 2)
        } catch (e) {
          console.error("Ошибка при парсинге JSON", e)
        }
      }

      setResponseBody(responseData)

      // Сохраняем запрос в историю после успешного ответа
      saveRequestToHistory()
    } catch (error) {
      setResponseStatus("Error")
      setResponseBody(JSON.stringify(error))
    }
  }

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

        <div className={styles.headersSection}>
          <label>{t("headers")}:</label>
          <button type="button" onClick={addHeader}>
            {t("add-header")}
          </button>
          {headers.map((header, index) => (
            <div key={index} className={styles.headerRow}>
              <input
                type="text"
                placeholder={t("header-key")}
                value={header.key}
                onChange={(e) => updateHeader(index, "key", e.target.value)}
              />
              <input
                type="text"
                placeholder={t("header-value")}
                value={header.value}
                onChange={(e) => updateHeader(index, "value", e.target.value)}
              />
              <button type="button" onClick={() => removeHeader(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className={styles.bodySection}>
          <label>{t("body")}:</label>
          <textarea
            placeholder={t("json/text-editor")}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button onClick={sendRequest}>{t("send-request")}</button>
      </div>

      <ResponseSection
        responseStatus={responseStatus}
        responseBody={responseBody}
      />
    </div>
  )
}

export default Rest
