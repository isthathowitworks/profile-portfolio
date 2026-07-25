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
      <body className="flex min-h-screen text-stone-800 dark:text-stone-100">
        <Sidebar />
        <main className="relative flex-1 bg-[#f5f0e6] dark:bg-stone-900 transition-colors">
          <div className="fixed top-2 right-2 sm:top-3 sm:right-3 z-50">
            <ThemeToggle />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}