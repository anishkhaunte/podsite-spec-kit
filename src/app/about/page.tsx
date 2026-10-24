import type { Metadata } from "next";
import { show } from "@/data/show";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: `About ${show.name} and the people who make it.`,
};

export default function AboutPage() {
  return (
    <div className="container page">
      <span className="eyebrow">About the show</span>
      <h1 className="page-title">
        Made by <span className="gradient-text">curious people</span>
      </h1>
      <div className={styles.prose}>
        {show.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h2 className={styles.heading}>Your hosts</h2>
      <div className={styles.hosts}>
        {show.hosts.map((host) => (
          <section key={host.name} className={styles.host} data-testid="host">
            <div className={styles.avatar} aria-hidden="true">
              {host.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <h3 className={styles.hostName}>{host.name}</h3>
            <p className={styles.bio}>{host.bio}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
