export type Episode = {
  number: number;
  title: string;
  /** ISO calendar date, YYYY-MM-DD. */
  publishedOn: string;
  durationSeconds: number;
  description: string;
  featured?: boolean;
};

export const episodes: Episode[] = [
  {
    number: 1,
    title: "Why We Started Listening",
    publishedOn: "2026-01-07",
    durationSeconds: 1925,
    description:
      "Maya and Daniel introduce the show, explain the rules of the room, and talk about the first thing they ever built together.",
  },
  {
    number: 2,
    title: "The Prototype That Never Shipped",
    publishedOn: "2026-01-21",
    durationSeconds: 2810,
    description:
      "A hardware founder walks through the demo that won over investors and the reasons it was quietly shelved.",
  },
  {
    number: 3,
    title: "Design Systems Are People Systems",
    publishedOn: "2026-02-04",
    durationSeconds: 3145,
    description:
      "Why the hardest part of a component library is never the components, with a design lead who has rebuilt three of them.",
  },
  {
    number: 4,
    title: "Sound Is a Material",
    publishedOn: "2026-02-18",
    durationSeconds: 2470,
    description:
      "A sound designer explains how interface sounds are made, tested, and sometimes thrown away after one afternoon.",
  },
  {
    number: 5,
    title: "Small Teams, Large Ambitions",
    publishedOn: "2026-03-04",
    durationSeconds: 3302,
    description:
      "Three people, one product, and a plan to compete with companies a hundred times their size.",
  },
  {
    number: 6,
    title: "Maps Without Borders",
    publishedOn: "2026-03-18",
    durationSeconds: 2688,
    description:
      "A cartographer on how maps decide what counts as a place, and what gets left off the page.",
  },
  {
    number: 7,
    title: "The Quiet Craft of Documentation",
    publishedOn: "2026-04-01",
    durationSeconds: 2234,
    description:
      "A technical writer makes the case that good docs are the most underrated feature of any product.",
  },
  {
    number: 8,
    title: "Failing in Public",
    publishedOn: "2026-04-15",
    durationSeconds: 3057,
    description:
      "An open-source maintainer shares what happened when a popular project nearly collapsed under its own success.",
  },
  {
    number: 9,
    title: "Typography at the Edge of the Screen",
    publishedOn: "2026-04-29",
    durationSeconds: 2593,
    description:
      "A type designer on drawing letters that stay readable on the smallest, cheapest displays in the world.",
  },
  {
    number: 10,
    title: "What the Data Doesn't Say",
    publishedOn: "2026-05-13",
    durationSeconds: 2916,
    description:
      "A researcher unpacks the gap between what users do, what they say, and what dashboards claim they meant.",
  },
  {
    number: 11,
    title: "Building for the Last Mile",
    publishedOn: "2026-05-27",
    durationSeconds: 3380,
    description:
      "Engineers who bring reliable software to places with unreliable networks, and what it taught them about simplicity.",
  },
  {
    number: 12,
    title: "The Case for Boring Technology",
    publishedOn: "2026-06-10",
    durationSeconds: 2742,
    description:
      "A veteran architect explains why the most exciting product decisions often rest on the dullest tools.",
  },
  {
    number: 13,
    title: "Making Room for Play",
    publishedOn: "2026-06-24",
    durationSeconds: 2105,
    description:
      "A game designer on the value of toys, side projects, and work with no goal except curiosity.",
  },
  {
    number: 14,
    title: "Inside a One-Person Studio",
    publishedOn: "2026-07-08",
    durationSeconds: 2859,
    description:
      "An independent maker shares the habits, tools, and boundaries that keep a solo practice sustainable.",
  },
  {
    number: 15,
    title: "Accessibility Is Not a Feature",
    publishedOn: "2026-07-22",
    durationSeconds: 3211,
    description:
      "Advocates and builders discuss why access starts at the first sketch rather than the final audit.",
  },
  {
    number: 16,
    title: "From Spreadsheet to Startup",
    publishedOn: "2026-08-05",
    durationSeconds: 2467,
    description:
      "How a messy internal tool grew into a real company, and the moment its founders almost walked away.",
  },
  {
    number: 17,
    title: "The Long Tail of Open Hardware",
    publishedOn: "2026-08-19",
    durationSeconds: 2998,
    description:
      "Makers who publish their circuit designs for free talk about community, copycats, and keeping the lights on.",
  },
  {
    number: 18,
    title: "Reading the Room Remotely",
    publishedOn: "2026-09-02",
    durationSeconds: 2336,
    description:
      "A distributed team lead shares what actually works for trust, rhythm, and good meetings across time zones.",
  },
  {
    number: 19,
    title: "Learning to Say No",
    publishedOn: "2026-09-16",
    durationSeconds: 2674,
    description:
      "A product manager on the unglamorous skill of protecting a roadmap from good ideas.",
  },
  {
    number: 20,
    title: "Season One Finale: What We Heard",
    publishedOn: "2026-09-30",
    durationSeconds: 3645,
    description:
      "Maya and Daniel look back on twenty conversations, pull out the threads that kept returning, and tease what comes next.",
    featured: true,
  },
];
