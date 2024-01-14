import { customInitApp } from "../lib/firebase-admin-config";
import NavMenu from "../components/navMenu";
import "./globals.css";

export const metadata = {
  title: "For a meaningful day",
  description: "Generated by SeolDong",
};


export default async function RootLayout({ children }) {
  customInitApp();

  return (
    <html>
      <body className="h-screen w-screen">
        <NavMenu />
        <section className="h-full w-full">{children}</section>
      </body>
    </html>
  );
}