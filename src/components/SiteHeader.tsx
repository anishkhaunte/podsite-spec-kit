"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { show } from "@/data/show";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/episodes/", label: "Episodes" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
];

function normalize(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export function SiteHeader() {
  const pathname = normalize(usePathname() ?? "/");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true" />
          {show.name}
        </Link>
        <nav aria-label="Main">
          <ul className={styles.list}>
            {links.map((link) => {
              const current = normalize(link.href) === pathname;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.link}
                    aria-current={current ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
