import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="container page">
      <span className="eyebrow">Error 404</span>
      <h1 className="page-title">
        This signal <span className="gradient-text">got lost</span>
      </h1>
      <p className="lead">We couldn&rsquo;t find the page you were looking for.</p>
      <p style={{ marginTop: "var(--space-3)" }}>
        <Link href="/" className="button">
          Back to the homepage
        </Link>
      </p>
    </div>
  );
}
