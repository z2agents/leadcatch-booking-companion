import { useEffect, useState } from "react";
import { BOOKING_URL } from "@/lib/site";
import { readLeadLocally } from "@/lib/lead";

/** Adds the visitor's details from step 1 so the GHL calendar form is already filled in. */
function prefilledUrl() {
  const lead = readLeadLocally();
  if (!lead) return BOOKING_URL;
  const [first, ...rest] = lead.fullName.trim().split(/\s+/);
  const params = new URLSearchParams();
  if (first) params.set("first_name", first);
  if (rest.length) params.set("last_name", rest.join(" "));
  if (lead.email) params.set("email", lead.email);
  if (lead.phone) params.set("phone", lead.phone);
  return `${BOOKING_URL}?${params.toString()}`;
}

/** The GHL booking calendar, as a plain fixed-height iframe. */
export function BookingCalendar() {
  // Built after mount: the visitor's details live in this browser tab only.
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => setSrc(prefilledUrl()), []);

  return (
    <div id="calendar" className="overflow-hidden rounded-[2rem] bg-card p-2 shadow-lift">
      {src ? (
        <iframe
          src={src}
          title="Book a free demo call with Z2 Agents"
          loading="lazy"
          className="block h-[800px] w-full rounded-[1.6rem] border-0 bg-card"
        />
      ) : (
        <div className="h-[800px] w-full animate-pulse rounded-[1.6rem] bg-bone-deep/60" />
      )}
    </div>
  );
}
