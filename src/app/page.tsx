import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedEpisode } from "@/components/FeaturedEpisode";
import { show } from "@/data/show";
import { getFeaturedEpisode } from "@/lib/episodes";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: `${show.name} · ${show.tagline}` },
  description: show.tagline,
};

export default function HomePage() {
  const featured = getFeaturedEpisode();

  return (
    <div className={`container page ${styles.hero}`}>
      <section className={styles.intro} aria-label="Introduction">
        <span className="eyebrow">A new episode every other Wednesday</span>
        <h1 className="page-title">
          <span className="gradient-text">{show.name}</span>
        </h1>
        <p className="lead">{show.tagline}</p>
        <Link href="/episodes/" className={`button ${styles.cta}`}>
          Browse all episodes <span aria-hidden="true">→</span>
        </Link>
      </section>
      <FeaturedEpisode episode={featured} />
    </div>
  );
}
