import { show } from "@/data/show";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.name}>{show.name}</p>
        <p className={styles.note}>A sample podcast site with placeholder content.</p>
      </div>
    </footer>
  );
}
