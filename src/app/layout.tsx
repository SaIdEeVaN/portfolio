import "./globals.css";
import InitialLoader from "./components/InitialLoader";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";

export const metadata = {
  title: "Baviri Setty Sai Deevan | Portfolio",
  description: "Developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="relative min-h-screen bg-background text-foreground antialiased">
        <InitialLoader />
        <div className="app-shell">
          <div className="relative z-10">
            <Navbar />
            <main className="mx-auto w-full max-w-5xl px-6 py-10">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}