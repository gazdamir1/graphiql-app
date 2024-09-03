import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import I18nProvider from "./i18Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GraphiQL App",
  description: "The app for using graphiql and postman functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <div className="rootWrapper">
            <Header />
            <main className="mainWrapper">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
