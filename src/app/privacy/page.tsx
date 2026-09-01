import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Privacy Policy | DevTom",
  description:
    "What DevTom collects through this website, why, how long it is kept, and how to request its deletion.",
  alternates: { canonical: "https://devtom.co/privacy" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    heading: "Who is responsible",
    body: [
      "This website is operated by DevTom d.o.o., a company registered in Novi Sad, Serbia. For any question about this policy or the data held about you, contact hello@devtom.co.",
    ],
  },
  {
    heading: "What is collected",
    body: [
      "Only what you type into the enquiry form: your name, your email address, and optionally your company, an indicative budget range, whether you would like a mutual NDA, and the description of your project.",
      "There is no analytics script, no advertising pixel and no third-party tracker on this site. No cookies are set. Nothing is collected from you unless you choose to submit the form or send an email.",
    ],
  },
  {
    heading: "Why it is collected",
    body: [
      "To read your enquiry and reply to it. That is the only purpose. Submitting the form does not subscribe you to anything, and your details are not added to a mailing list or a sales sequence.",
    ],
  },
  {
    heading: "Where it goes",
    body: [
      "Form submissions are delivered to a DevTom mailbox by an email delivery provider acting as a processor on our behalf. They are not sold, rented or shared with anyone else. If an engagement follows, any further handling of your information is governed by the contract and any NDA we sign.",
    ],
  },
  {
    heading: "How long it is kept",
    body: [
      "Enquiries that do not lead to an engagement are deleted within twelve months. Correspondence relating to an actual engagement is retained for as long as the contract and applicable accounting law require, and no longer.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask what is held about you, ask for it to be corrected, or ask for it to be deleted. Email hello@devtom.co and we will action it within thirty days. You do not need to give a reason, and there is no form to fill in.",
      "If you are in the EU or the UK and believe your data has been handled improperly, you may also complain to your national data protection authority.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-6 py-20 sm:px-10 md:py-28">
        <article className="mx-auto max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-faint uppercase">
            <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-accent" />
            Privacy policy
          </p>

          <h1 className="mt-6 text-3xl leading-[1.15] font-medium tracking-tight sm:text-4xl">
            What we collect, and what we do with it.
          </h1>

          <p className="mt-6 leading-relaxed text-muted">
            This site collects almost nothing. There is no analytics, no
            advertising and no tracking of any kind. The only information we
            hold is what you deliberately send us.
          </p>

          <div className="mt-14 space-y-12">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-medium tracking-tight">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 leading-relaxed text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <p className="text-sm text-faint">
              Last updated 1 September 2026. DevTom d.o.o., Novi Sad, Serbia.
            </p>
            <Link
              href="/"
              className="link-underline mt-4 inline-flex items-center gap-2 text-sm transition-colors hover:text-accent"
            >
              <span aria-hidden="true">&larr;</span> Back to the site
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
