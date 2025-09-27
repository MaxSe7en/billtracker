import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Script from "next/script";

// Default SEO
export const metadata: Metadata = {
  title: "BillTracker – Track US Laws & Join State Communities",
  description:
    "Track laws, bills, and politician activity across all 50 states and federal level. Join discussions in your state's community and stay informed with AI-powered bill summaries.",
  keywords: [
    "US bills",
    "state legislation",
    "track laws",
    "politician activity",
    "bill tracker",
    "AI bill summaries",
    "community discussion",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://billtracker.com",
    siteName: "BillTracker",
    title: "BillTracker – Track US Laws & Join State Communities",
    description:
      "Follow US bills and state legislation, with AI-powered summaries and community discussions.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@billtracker",
    creator: "@billtracker",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background text-foreground">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Global JSON-LD Schema */}
        <Script
          id="ld-json-global"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BillTracker",
              url: "https://billtracker.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://billtracker.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
