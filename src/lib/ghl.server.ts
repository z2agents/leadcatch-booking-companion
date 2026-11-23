/**
 * Server-only GoHighLevel helper. Sends website leads into the GHL sub-account as contacts.
 *
 * Needs two environment variables (set them in Vercel and in a local .env.local, NEVER in .env,
 * because this repo is public):
 *   GHL_PRIVATE_TOKEN  - Private Integration token (Settings > Private Integrations), scope: contacts
 *   GHL_LOCATION_ID    - the sub-account's Location ID (Settings > Business Profile)
 * If either is missing, calls are skipped quietly so the site still works.
 */
const API = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

export type GhlLead = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  tags: string[];
  note?: string;
};

function config() {
  const token = process.env["GHL_PRIVATE_TOKEN"];
  const locationId = process.env["GHL_LOCATION_ID"];
  return token && locationId ? { token, locationId } : null;
}

/** Creates or updates the contact (matched by email/phone). Returns false if GHL is not configured or the call failed. */
export async function sendLeadToGhl(lead: GhlLead): Promise<boolean> {
  const cfg = config();
  if (!cfg) {
    console.warn("GHL not configured: set GHL_PRIVATE_TOKEN and GHL_LOCATION_ID");
    return false;
  }
  const headers = {
    Authorization: `Bearer ${cfg.token}`,
    Version: VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  try {
    const res = await fetch(`${API}/contacts/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        locationId: cfg.locationId,
        firstName: lead.firstName,
        lastName: lead.lastName || undefined,
        email: lead.email,
        phone: lead.phone || undefined,
        tags: lead.tags,
        source: "Z2 website",
      }),
    });
    if (!res.ok) {
      console.error("GHL upsert failed", res.status, await res.text().catch(() => ""));
      return false;
    }
    const json = (await res.json().catch(() => null)) as { contact?: { id?: string } } | null;
    const id = json?.contact?.id;
    if (id && lead.note) {
      await fetch(`${API}/contacts/${id}/notes`, {
        method: "POST",
        headers,
        body: JSON.stringify({ body: lead.note }),
      }).catch(() => undefined);
    }
    return true;
  } catch (err) {
    console.error("GHL request error", err);
    return false;
  }
}

/** "Jane Mary Doe" -> { firstName: "Jane", lastName: "Mary Doe" } */
export function splitName(full: string) {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}
