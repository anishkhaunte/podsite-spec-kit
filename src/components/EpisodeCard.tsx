import { CoverArt } from "@/components/CoverArt";
import type { Episode } from "@/data/episodes";
import { formatDate, formatDuration } from "@/lib/format";
import styles from "./EpisodeCard.module.css";

export function EpisodeCard({ episode }: { episode: Episode }) {
  const titleId = `episode-${episode.number}-title`;

  return (
    <li>
      <article className={styles.card} data-testid="episode-item" aria-labelledby={titleId}>
        <div className={styles.art}>
          <CoverArt number={episode.number} />
        </div>
        <div className={styles.body}>
          <p className={styles.number}>Episode {episode.number}</p>
          <h2 id={titleId} className={styles.title}>
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
    </li>
  );
}
