import { episodes, type Episode } from "@/data/episodes";

/** All episodes, highest episode number (newest) first. */
export function getEpisodesNewestFirst(): Episode[] {
  return [...episodes].sort((a, b) => b.number - a.number);
}

/** The single episode marked `featured`. */
export function getFeaturedEpisode(): Episode {
  const featured = episodes.filter((episode) => episode.featured);
  if (featured.length !== 1) {
    throw new Error(`Expected exactly one featured episode, found ${featured.length}`);
  }
  return featured[0];
}
