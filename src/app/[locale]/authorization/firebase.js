import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth" // Добавь, если используешь аутентификацию
import { getAnalytics } from "firebase/analytics" // Добавь, если используешь аналитику

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDsdLShEmpfrzHHYrlebww75p_wF6vatSk",
  authDomain: "graphiql-app-f582b.firebaseapp.com",
  projectId: "graphiql-app-f582b",
  storageBucket: "graphiql-app-f582b.appspot.com",
  messagingSenderId: "554464796086",
  appId: "1:554464796086:web:6a40aab59d9a135af5f517",
  measurementId: "G-9D22Q622DY",
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app) // Если используешь аутентификацию
const analytics = getAnalytics(app) // Если используешь аналитику

export { auth, analytics }
export default app
