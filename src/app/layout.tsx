import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClinicShield — NHS DSPT Compliance Made Simple",
  description:
    "Complete your NHS DSPT in hours, not weeks. No consultant needed. Guided questionnaire, gap analysis, and policy templates for GP practices, dental clinics, pharmacies and more. From £49/year.",
  keywords: [
    "DSPT",
    "NHS",
    "Data Security",
    "Protection Toolkit",
    "compliance",
    "GP practice",
    "dental clinic",
    "pharmacy",
    "healthcare",
  ],
  openGraph: {
    title: "ClinicShield — NHS DSPT Compliance Made Simple",
    description:
      "Complete your NHS DSPT in hours, not weeks. No consultant needed. From £49/year.",
    url: "https://clinicshield.co.uk",
    siteName: "ClinicShield",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
