import { NavLink } from 'react-router-dom'

const tocItems = [
  { id: 'section-1', label: '1. Introduction' },
  { id: 'section-2', label: '2. Information We Collect' },
  { id: 'section-3', label: '3. How We Use Your Information' },
  { id: 'section-4', label: '4. Cookies Policy' },
  { id: 'section-5', label: '5. Data Protection' },
  { id: 'section-6', label: '6. Third-Party Services' },
  { id: 'section-7', label: '7. User Rights' },
  { id: 'section-8', label: '8. Children\'s Privacy' },
  { id: 'section-9', label: '9. Changes to This Policy' },
  { id: 'section-10', label: '10. Privacy Concerns' },
]

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--color-secondary)]">
      <header className="relative overflow-hidden border-b border-[var(--color-neutral-200)]/70 bg-gradient-to-b from-[var(--color-secondary-100)] via-[var(--color-secondary)] to-[var(--color-secondary)] pt-24 pb-12 md:pt-28 md:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(30,58,138,0.06),transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs uppercase tracking-[0.18em] text-[var(--color-neutral-400)] md:text-[13px] md:tracking-[0.12em]">
              <li>
                <NavLink
                  to="/"
                  className="text-[var(--color-neutral-500)] underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
                >
                  Home
                </NavLink>
              </li>
              <li aria-hidden className="text-[var(--color-neutral-300)]">
                /
              </li>
              <li className="font-medium text-[var(--color-neutral-600)] normal-case tracking-normal md:text-sm">
                Privacy Policy
              </li>
            </ol>
          </nav>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--color-primary)] md:text-5xl md:tracking-tighter">
            Privacy Policy
          </h1>
          <p className="mt-4 font-sans text-sm text-[var(--color-neutral-500)] md:text-base">
            Last updated: April 30, 2026
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14 lg:px-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(12rem,15rem)] lg:gap-x-16 xl:grid-cols-[minmax(0,1fr)_minmax(14rem,16rem)] xl:gap-x-20">
          <article className="min-w-0 max-w-[42rem]">
            <div className="space-y-14 md:space-y-[4.25rem]">
              <section id="section-1" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  1. Introduction
                </h2>
                <p className="font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  Three Pin Realty ("we," "our," or "us") is committed to protecting your personal information
                  and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and
                  safeguard your information when you visit our website, which lists properties for sale and rent.
                  Please read this policy carefully. By using our site, you consent to the practices described herein.
                </p>
              </section>

              <section id="section-2" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  2. Information We Collect
                </h2>
                <p className="mb-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  We collect information that you voluntarily provide to us, as well as automatically gathered
                  data when you browse our site. The types of information we may collect include:
                </p>
                <ul className="list-disc space-y-3 pl-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] marker:text-[var(--color-neutral-400)] md:text-base md:leading-relaxed">
                  <li>
                    <strong>Contact Information</strong> — such as your name, email address, phone number,
                    and any message content you submit through our contact or inquiry forms.
                  </li>
                  <li>
                    <strong>Property Inquiry Data</strong> — the properties you express interest in, your
                    budget range, preferred locations, and other preferences you share.
                  </li>
                  <li>
                    <strong>Technical Data</strong> — your IP address, browser type and version, operating
                    system, device identifiers, and similar technical information collected automatically.
                  </li>
                  <li>
                    <strong>Usage Data</strong> — pages visited, time spent on pages, click patterns, referring
                    URLs, and other navigation behavior recorded as you browse the site.
                  </li>
                  <li>
                    <strong>Images and Content</strong> — any photos, descriptions, or property data uploaded
                    by our administrative team on behalf of listing clients.
                  </li>
                </ul>
              </section>

              <section id="section-3" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  3. How We Use Your Information
                </h2>
                <p className="mb-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc space-y-3 pl-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] marker:text-[var(--color-neutral-400)] md:text-base md:leading-relaxed">
                  <li>To present, maintain, and improve our website and its content.</li>
                  <li>To respond to your inquiries, process contact form submissions, and provide customer support.</li>
                  <li>To match you with relevant property listings based on your expressed preferences.</li>
                  <li>To send you updates, promotional materials, and newsletters where you have opted in.</li>
                  <li>To monitor website usage patterns and analyze traffic to optimize user experience.</li>
                  <li>To detect, prevent, and address technical issues, fraud, or unlawful activity.</li>
                  <li>To comply with applicable legal obligations and enforce our terms of service.</li>
                </ul>
              </section>

              <section id="section-4" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  4. Cookies Policy
                </h2>
                <p className="mb-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  We use cookies and similar tracking technologies to operate our website and to record
                  information about your browsing activity. Cookies are small data files stored on your device.
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 font-sans text-base font-semibold text-[var(--color-primary)] md:text-[17px]">
                      Types of Cookies We Use
                    </h3>
                    <ul className="list-disc space-y-3 pl-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] marker:text-[var(--color-neutral-400)] md:text-base md:leading-relaxed">
                      <li>
                        <strong>Essential Cookies</strong> — Required for basic site functionality. These
                        cannot be disabled without affecting site performance.
                      </li>
                      <li>
                        <strong>Analytics Cookies</strong> — Help us understand how visitors interact with
                        our site so we can improve its functionality and content.
                      </li>
                      <li>
                        <strong>Marketing Cookies</strong> — Used to deliver relevant advertisements and
                        track campaign performance. You can opt out of these via your browser settings.
                      </li>
                    </ul>
                  </div>
                  <p className="font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                    You may adjust your browser settings to reject cookies at any time. Disabling certain
                    cookies may limit your ability to use specific features of our website.
                  </p>
                </div>
              </section>

              <section id="section-5" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  5. Data Protection
                </h2>
                <p className="mb-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  We implement appropriate administrative, technical, and physical safeguards to protect your
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                  Our security measures include:
                </p>
                <ul className="list-disc space-y-3 pl-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] marker:text-[var(--color-neutral-400)] md:text-base md:leading-relaxed">
                  <li>Encrypted transmission of sensitive data using SSL/TLS protocols.</li>
                  <li>Access controls limiting data access to authorized personnel only.</li>
                  <li>Regular security assessments and monitoring of our infrastructure.</li>
                  <li>Secure storage of property images and admin-uploaded content.</li>
                </ul>
                <p className="mt-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  Despite these measures, no method of transmission over the internet or electronic storage
                  is completely secure. We cannot guarantee absolute security, but we are committed to
                  maintaining reasonable protections for your data.
                </p>
              </section>

              <section id="section-6" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  6. Third-Party Services
                </h2>
                <p className="mb-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  We may share your information with the following categories of third parties:
                </p>
                <ul className="list-disc space-y-3 pl-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] marker:text-[var(--color-neutral-400)] md:text-base md:leading-relaxed">
                  <li>
                    <strong>Service Providers</strong> — Companies that assist us in operating our website,
                    conducting our business, or delivering services, such as hosting providers and analytics
                    platforms, under strict confidentiality agreements.
                  </li>
                  <li>
                    <strong>Property Advertisers</strong> — Third parties whose properties may appear on our
                    platform. Their use of your data is governed by their own privacy policies.
                  </li>
                  <li>
                    <strong>Legal Authorities</strong> — Law enforcement, regulators, or other governmental
                    bodies when required by law, court order, or to protect our rights and safety.
                  </li>
                  <li>
                    <strong>Business Partners</strong> — Entities involved in property transactions, such as
                    mortgage providers, legal firms, or moving services, only where you have expressed interest
                    or consented.
                  </li>
                </ul>
                <p className="mt-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section id="section-7" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  7. User Rights
                </h2>
                <p className="mb-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  Depending on your jurisdiction, you may have the following rights regarding your personal
                  data:
                </p>
                <ul className="list-disc space-y-3 pl-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] marker:text-[var(--color-neutral-400)] md:text-base md:leading-relaxed">
                  <li>
                    <strong>Right to Access</strong> — Request a copy of the personal data we hold about you.
                  </li>
                  <li>
                    <strong>Right to Correction</strong> — Request correction of inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Right to Deletion</strong> — Request deletion of your personal data, subject to
                    legal retention requirements.
                  </li>
                  <li>
                    <strong>Right to Object</strong> — Object to the processing of your data for direct
                    marketing purposes.
                  </li>
                  <li>
                    <strong>Right to Data Portability</strong> — Receive your data in a structured, commonly
                    used, and machine-readable format.
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent</strong> — Withdraw consent at any time where processing
                    is based on your consent.
                  </li>
                </ul>
                <p className="mt-6 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  To exercise any of these rights, please contact us using the information provided in the
                  final section of this policy. We will respond to your request within the timeframe required
                  by applicable law.
                </p>
              </section>

              <section id="section-8" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  8. Children&apos;s Privacy
                </h2>
                <p className="font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  Our website is not intended for individuals under the age of 18. We do not knowingly collect
                  personal information from minors. If we become aware that we have inadvertently collected
                  data from a minor, we will take steps to delete that information promptly.
                </p>
              </section>

              <section id="section-9" className="scroll-mt-[6.75rem]">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  9. Changes to This Policy
                </h2>
                <p className="font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  {
                    'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The revised policy will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically. Your continued use of our site after any changes constitutes acceptance of the updated policy.'
                  }
                </p>
              </section>

              <section id="section-10" className="scroll-mt-[6.75rem] pt-4 md:pt-5">
                <h2 className="mb-5 font-serif text-xl font-semibold leading-snug text-[var(--color-primary)] md:mb-6 md:text-2xl">
                  10. Privacy Concerns
                </h2>
                <p className="mb-5 font-sans text-[15px] leading-[1.72] text-[var(--color-neutral-600)] md:text-base md:leading-relaxed">
                  If you have any questions or concerns about this Privacy Policy or our data practices,
                  please contact us at:
                </p>
                <p className="font-sans text-[15px] text-[var(--color-neutral-600)] md:text-base">
                  <a
                    href="mailto:3pinrentals@gmail.com"
                    className="text-[var(--color-accent)] underline decoration-[var(--color-neutral-300)] underline-offset-[0.22em] transition-colors hover:decoration-[var(--color-accent)] hover:text-[var(--color-accent-light)]"
                  >
                    3pinrentals@gmail.com
                  </a>
                </p>
              </section>
            </div>

            <footer className="mt-16 border-t border-[var(--color-neutral-200)] pt-10 md:mt-20 md:pt-12">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
                <p className="font-serif text-base font-medium text-[var(--color-primary)] md:text-lg">
                  Three Pin Realty
                </p>
                <p className="font-sans text-sm text-[var(--color-neutral-500)]">
                  Privacy concerns:{' '}
                  <a
                    href="mailto:3pinrentals@gmail.com"
                    className="text-[var(--color-accent)] underline-offset-[3px] transition-colors hover:underline"
                  >
                    3pinrentals@gmail.com
                  </a>
                </p>
              </div>
            </footer>
          </article>

          <aside className="mt-14 hidden lg:mt-4 lg:block" aria-labelledby="privacy-toc-heading">
            <div className="sticky top-28 pb-8">
              <p id="privacy-toc-heading" className="mb-5 font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-neutral-500)]">
                On this page
              </p>
              <nav aria-label="Table of contents">
                <ul className="flex flex-col gap-2 border-l border-[var(--color-neutral-200)] pl-5">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="font-sans text-[13px] leading-snug text-[var(--color-neutral-600)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
