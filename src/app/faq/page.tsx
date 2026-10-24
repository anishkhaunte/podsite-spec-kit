import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about the podcast.",
};

export default function FaqPage() {
  return (
    <div className="container page">
      <span className="eyebrow">Questions</span>
      <h1 className="page-title">
        Frequently asked <span className="gradient-text">questions</span>
      </h1>
      <div style={{ marginTop: "var(--space-4)", maxWidth: "52rem" }}>
        <FaqList entries={faq} />
      </div>
    </div>
  );
}
