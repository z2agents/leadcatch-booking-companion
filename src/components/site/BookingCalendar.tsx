import { BOOKING_URL } from "@/lib/site";

/** The GHL booking calendar, as a plain fixed-height iframe. */
export function BookingCalendar() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-card p-2 shadow-lift">
      <iframe
        src={BOOKING_URL}
        title="Book a free demo call with Z2 Agents"
        loading="lazy"
        className="block h-[800px] w-full rounded-[1.6rem] border-0 bg-card"
      />
    </div>
  );
}
