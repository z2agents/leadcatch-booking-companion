import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { CONTACT_EMAIL, SMS_DISCLOSURE } from "@/lib/contact";
import { pageHead } from "@/lib/seo";

const ADDRESS = "[ADDRESS]";
const UPDATED = "[DATE]";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead("/privacy-policy", "Privacy Policy — Z2 Agents", "How Z2 Agents collects, uses and protects your name, email and phone number, and how SMS consent works."),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy" accent="Policy." updated={UPDATED}>
      <LegalSection n={1} title="What we collect">
        <p>When you contact us or book a call, we collect:</p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number</li>
          <li>Anything you write in your message</li>
        </ul>
      </LegalSection>
      <LegalSection n={2} title="How we use it">
        <ul>
          <li>To book and manage your appointment</li>
          <li>To send confirmations and reminders</li>
          <li>To reply to your questions</li>
        </ul>
        <p>We only send marketing messages if you ticked the marketing box.</p>
      </LegalSection>
      <LegalSection n={3} title="SMS messages and consent">
        <p>We text you only if you agree. SMS consent is optional.</p>
        <p>{SMS_DISCLOSURE}</p>
        <p>
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text
            messaging originator opt-in data and consent will not be shared with any third parties.
          </strong>
        </p>
      </LegalSection>
      <LegalSection n={4} title="Website analytics and tools">
        <p>
          We use Lovable's visitor analytics to see how our site is used. It records the pages visited, where visitors came
          from, their country, browser, operating system and device type, how long they stay, how fast pages load, errors,
          and which buttons and links are clicked. This is recorded for every visitor.
        </p>
        <p>
          It uses no cookies, stores nothing on your device, doesn't keep IP addresses and doesn't identify you. Detailed data
          is kept for 90 days and daily summaries for a year. Lovable collects this data for us.{" "}
          <a href="https://lovable.dev/privacy" target="_blank" rel="noreferrer">
            Lovable's privacy policy
          </a>{" "}
          explains how it handles it.
        </p>
        <p>
          Our booking calendar is provided by LeadConnector (HighLevel), which receives the details you enter when you book.
          Our fonts load from Google Fonts, which receives your browser's request.
        </p>
      </LegalSection>
      <LegalSection n={5} title="Data security">
        <p>We store your information on secure systems and limit access to the people who need it to serve you.</p>
      </LegalSection>
      <LegalSection n={6} title="Deleting your data">
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to see, correct or delete your information. We'll
          confirm once it's done.
        </p>
      </LegalSection>
      <LegalSection n={7} title="Contact us">
        <p>
          Z2 Agents · {ADDRESS} · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p>
          See also our <Link to="/terms-of-service">Terms of Service</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
