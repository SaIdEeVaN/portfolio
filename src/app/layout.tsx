import "./globals.css";
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
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl px-6 py-10">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}