import type { FaqEntry } from "@/data/faq";
import styles from "./FaqList.module.css";

export function FaqList({ entries }: { entries: FaqEntry[] }) {
  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <details key={entry.question} className={styles.item}>
          <summary className={styles.question}>
            <span>{entry.question}</span>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{entry.answer}</p>
        </details>
      ))}
    </div>
  );
}
