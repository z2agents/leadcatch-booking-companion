/** GHL booking calendar shown in the booking section. */
export const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/QZ3JU9yCIqPT8BRYkdkf";

export const BOOK_ANCHOR = "#book";

/** Share of missed callers assumed to have booked if someone had picked up. */
export const MISSED_CALLER_BOOKING_RATE = 0.5;
export const WEEKS_PER_MONTH = 4;

/** Revenue lost per month from unanswered calls. */
export function monthlyLeak(missedCallsPerWeek: number, avgBookingValue: number): number {
  const calls = Math.max(0, missedCallsPerWeek);
  const value = Math.max(0, avgBookingValue);
  return Math.round(calls * WEEKS_PER_MONTH * MISSED_CALLER_BOOKING_RATE * value);
}
