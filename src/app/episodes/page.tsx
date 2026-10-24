import type { Metadata } from "next";
import { EpisodeCard } from "@/components/EpisodeCard";
import { getEpisodesNewestFirst } from "@/lib/episodes";
import styles from "./episodes.module.css";

export const metadata: Metadata = {
  title: "Episodes",
  description: "Every episode of the podcast, newest first.",
};

export default function EpisodesPage() {
  const episodes = getEpisodesNewestFirst();

  return (
    <div className="container page">
      <span className="eyebrow">The archive</span>
      <h1 className="page-title">Episodes</h1>
      <p className="lead">
        All {episodes.length} conversations so far, newest first.
      </p>
      <ol className={styles.list}>
        {episodes.map((episode) => (
          <EpisodeCard key={episode.number} episode={episode} />
        ))}
      </ol>
    </div>
  );
}
