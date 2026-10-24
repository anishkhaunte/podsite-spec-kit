import { CoverArt } from "@/components/CoverArt";
import type { Episode } from "@/data/episodes";
import { formatDate, formatDuration } from "@/lib/format";
import styles from "./FeaturedEpisode.module.css";

export function FeaturedEpisode({ episode }: { episode: Episode }) {
  return (
    <article className={styles.card} data-testid="featured-episode" aria-labelledby="featured-title">
      <div className={styles.art}>
        <CoverArt number={episode.number} />
      </div>
      <div className={styles.body}>
        <p className="eyebrow">Featured episode</p>
        <p className={styles.number}>Episode {episode.number}</p>
        <h2 id="featured-title" className={styles.title}>
          {episode.title}
        </h2>
        <p className={styles.meta}>
          <time dateTime={episode.publishedOn}>{formatDate(episode.publishedOn)}</time>
          <span aria-hidden="true"> · </span>
          <span>{formatDuration(episode.durationSeconds)}</span>
        </p>
        <p className={styles.description}>{episode.description}</p>
      </div>
    </article>
  );
}
