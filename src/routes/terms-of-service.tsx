import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { CONTACT_EMAIL, SMS_DISCLOSURE } from "@/lib/contact";
import { pageHead } from "@/lib/seo";

const GOVERNING_LAW = "[GOVERNING LAW]";
const UPDATED = "[DATE]";

export const Route = createFileRoute("/terms-of-service")({
  head: () =>
    pageHead("/terms-of-service", "Terms of Service — Z2 Agents", "The terms for using Z2 Agents' AI booking agents, website and SMS messages."),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Terms of" accent="Service." updated={UPDATED}>
      <LegalSection n={1} title="Our services">
        <p>
          Z2 Agents sets up AI calling and chat agents, missed-call text-back, calendars and booking, websites and landing
          pages, CRM, automations and an owner dashboard — as one connected platform.
        </p>
      </LegalSection>
      <LegalSection n={2} title="Your responsibilities">
        <ul>
          <li>Give us accurate information.</li>
          <li>Use our services lawfully.</li>
          <li>Keep your login details safe.</li>
        </ul>
      </LegalSection>
      <LegalSection n={3} title="SMS terms">
        <p>By opting in, you agree to receive texts from Z2 Agents about your request or, if you chose it, occasional marketing.</p>
        <p>{SMS_DISCLOSURE}</p>
        <p>
          See our <Link to="/privacy-policy">Privacy Policy</Link> for how we handle your number.
        </p>
      </LegalSection>
      <LegalSection n={4} title="Limitation of liability">
        <p>
          Our services are provided "as is". To the extent the law allows, Z2 Agents isn't liable for indirect or consequential
          losses, including lost bookings or revenue.
        </p>
      </LegalSection>
      <LegalSection n={5} title="Changes to these terms">
        <p>We may update these terms. The date at the top shows the latest version.</p>
      </LegalSection>
      <LegalSection n={6} title="Governing law">
        <p>These terms are governed by the laws of {GOVERNING_LAW}.</p>
      </LegalSection>
      <LegalSection n={7} title="Contact">
        <p>
          Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
