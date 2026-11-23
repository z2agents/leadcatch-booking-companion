import { createFileRoute } from "@tanstack/react-router";
import { BookingPage } from "@/components/site/BookingPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/book")({
  head: () =>
    pageHead("/book", "Book a free demo call — Z2 Agents", "Pick a time for a free 30-minute demo call and see a Z2 AI booking agent live."),
  component: () => <BookingPage />,
});
