import { createFileRoute } from "@tanstack/react-router";
import { BookingPage } from "@/components/site/BookingPage";
import { VideoPlaceholder } from "@/components/site/VideoPlaceholder";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/book-demo")({
  head: () =>
    pageHead(
      "/book-demo",
      "See our AI agent book a call — Z2 Agents",
      "Watch a Z2 AI agent book a call, then pick a time for your free demo.",
    ),
  component: () => <BookingPage above={<VideoPlaceholder caption="See our AI agent book a call" />} />,
});
