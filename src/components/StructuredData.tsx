/**
 * ProfessionalService schema. `knowsAbout` carries the stack keywords that
 * agencies filter on — the job the on-page Capabilities list used to do,
 * without spending page real estate on a wall of chips.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://devtom.co/#organization",
  name: "DevTom",
  legalName: "DevTom d.o.o.",
  url: "https://devtom.co",
  email: "hello@devtom.co",
  description:
    "Software consultancy in Novi Sad delivering scoped contract engineering for regulated and transaction-critical systems: new development, assuming ownership of existing systems, infrastructure, and AI workflows where actions cannot be reversed.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Novi Sad",
    addressCountry: "RS",
  },
  areaServed: [
    { "@type": "Place", name: "European Union" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Serbia" },
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "Angular",
    "Node.js",
    "Next.js",
    ".NET",
    "C#",
    "PostgreSQL",
    "SQL Server",
    "GraphQL",
    "REST APIs",
    "AWS",
    "Vercel",
    "Docker",
    "CI/CD",
    "DevOps",
    "Electronic health records",
    "HIPAA-regulated environments",
    "Legacy code modernisation",
    "AI agent workflows",
    "Retrieval-augmented generation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Product software development services",
    itemListElement: [
      "Defined-scope development",
      "Assuming ownership of an existing system",
      "Infrastructure and DevOps",
      "Ongoing maintenance",
      "AI and agent workflows for irreversible systems",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    email: "hello@devtom.co",
    availableLanguage: ["English", "Serbian"],
  },
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
