import "./globals.css";
import Sidebar from "./sidebar";

export const metadata = {
  title: "Ian Kinneh R. Encinas — Portfolio",
  description: "3rd year BSIT student portfolio — projects, about, and contact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen text-stone-800 dark:text-stone-100">
        <Sidebar />
        <main className="flex-1 bg-[#f5f0e6] dark:bg-stone-900 transition-colors">
          {children}
        </main>
      </body>
    </html>
  );
}