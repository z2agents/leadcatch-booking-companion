// Checks that the GoHighLevel connection works. Creates nothing; it only reads one contact record.
// Usage (from the website folder):  node scripts/check-ghl.mjs
// Reads GHL_PRIVATE_TOKEN and GHL_LOCATION_ID from .env.local. It never prints the token.
import { readFileSync, existsSync } from "node:fs";

const file = ".env.local";
if (!existsSync(file)) {
  console.error(`No ${file} file found. Create it in this folder with two lines:\nGHL_PRIVATE_TOKEN=...\nGHL_LOCATION_ID=...`);
  process.exit(1);
}

const env = {};
for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const token = env.GHL_PRIVATE_TOKEN;
const locationId = env.GHL_LOCATION_ID;
if (!token) console.error("Missing GHL_PRIVATE_TOKEN in .env.local");
if (!locationId) console.error("Missing GHL_LOCATION_ID in .env.local");
if (!token || !locationId) process.exit(1);

const res = await fetch(
  `https://services.leadconnectorhq.com/contacts/?locationId=${encodeURIComponent(locationId)}&limit=1`,
  { headers: { Authorization: `Bearer ${token}`, Version: "2021-07-28", Accept: "application/json" } },
);

if (res.ok) {
  console.log("OK: GoHighLevel accepted the token and the Location ID. The contact form can send leads.");
} else if (res.status === 401) {
  console.error("401: the token is wrong, expired or was copied with extra spaces. Create a new Private Integration token.");
  process.exit(1);
} else if (res.status === 403) {
  console.error("403: the token is valid but lacks permission. In the Private Integration, enable Contacts (view and edit).");
  process.exit(1);
} else {
  console.error(`GHL answered ${res.status}. Check that the Location ID belongs to the same sub-account as the token.`);
  console.error((await res.text()).slice(0, 300));
  process.exit(1);
}
