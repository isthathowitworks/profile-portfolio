import "./globals.css";
import Sidebar from "./sidebar";
import ThemeToggle from "./theme-toggle";

export const metadata = {
  title: "Ian Kinneh R. Encinas — Portfolio",
  description: "3rd year BSIT student portfolio — projects, about, and contact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-stone-800 dark:text-stone-100">
        <Sidebar />
        <main className="relative min-h-screen bg-[#f5f0e6] dark:bg-stone-900 transition-colors pt-24 pl-20 sm:pl-24">
          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}