import { describe, expect, it } from "vitest";
import { episodes } from "@/data/episodes";
import { faq } from "@/data/faq";
import { show } from "@/data/show";
import { getEpisodesNewestFirst, getFeaturedEpisode } from "@/lib/episodes";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("episodes", () => {
  it("has exactly 20 episodes with unique numbers 1-20", () => {
    expect(episodes).toHaveLength(20);
    const numbers = episodes.map((e) => e.number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });

  it("has valid fields on every episode", () => {
    for (const e of episodes) {
      expect(e.title.trim()).not.toBe("");
      expect(e.description.trim()).not.toBe("");
      expect(e.publishedOn).toMatch(ISO_DATE);
      const parsed = new Date(`${e.publishedOn}T00:00:00Z`);
      expect(parsed.toISOString().slice(0, 10)).toBe(e.publishedOn);
      expect(Number.isInteger(e.durationSeconds)).toBe(true);
      expect(e.durationSeconds).toBeGreaterThan(0);
    }
  });

  it("has exactly one featured episode", () => {
    expect(episodes.filter((e) => e.featured)).toHaveLength(1);
    expect(getFeaturedEpisode().number).toBe(20);
  });

  it("gives a higher number a later publish date", () => {
    const byNumber = [...episodes].sort((a, b) => a.number - b.number);
    for (let i = 1; i < byNumber.length; i++) {
      expect(byNumber[i].publishedOn > byNumber[i - 1].publishedOn).toBe(true);
    }
  });

  it("lists newest first", () => {
    const ordered = getEpisodesNewestFirst().map((e) => e.number);
    expect(ordered).toEqual(Array.from({ length: 20 }, (_, i) => 20 - i));
  });
});

describe("faq", () => {
  it("has non-empty, unique questions and non-empty answers", () => {
    expect(faq.length).toBeGreaterThan(0);
    for (const entry of faq) {
      expect(entry.question.trim()).not.toBe("");
      expect(entry.answer.trim()).not.toBe("");
    }
    expect(new Set(faq.map((f) => f.question)).size).toBe(faq.length);
  });
});

describe("show", () => {
  it("has required fields and at least one host", () => {
    expect(show.name.trim()).not.toBe("");
    expect(show.tagline.trim()).not.toBe("");
    expect(show.description.length).toBeGreaterThanOrEqual(1);
    expect(show.description.length).toBeLessThanOrEqual(3);
    expect(show.hosts.length).toBeGreaterThanOrEqual(1);
    for (const host of show.hosts) {
      expect(host.name.trim()).not.toBe("");
      expect(host.bio.trim()).not.toBe("");
    }
  });
});
