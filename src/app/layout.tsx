import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

/* Type is grounded in the subject: the archive and the audit trail.
   Archivo — named for archival signage, a grotesque with institutional
   authority — carries the display role. IBM Plex Sans, drawn for engineering
   documentation, sets the body. Plex Mono handles record data: dates,
   references, labels. Deliberately not the scaffold's default families. */
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "DevTom is a software consultancy in Novi Sad delivering scoped contract engineering: new development, assuming ownership of existing systems, and AI workflows for environments where actions cannot be reversed.";

export const metadata: Metadata = {
  metadataBase: new URL("https://devtom.co"),
  title: "Contract Software Development & AI Integration | DevTom",
  description,
  openGraph: {
    title: "Contract Software Development & AI Integration | DevTom",
    description,
    url: "https://devtom.co",
    siteName: "DevTom",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contract Software Development & AI Integration | DevTom",
    description,
  },
  alternates: { canonical: "https://devtom.co" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
