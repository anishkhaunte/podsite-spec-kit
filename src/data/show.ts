export type Host = {
  name: string;
  bio: string;
};

export type Show = {
  name: string;
  tagline: string;
  description: string[];
  hosts: Host[];
};

export const show: Show = {
  name: "Open Frequency",
  tagline: "Conversations with the people who build what comes next.",
  description: [
    "Open Frequency is a biweekly podcast about the people, ideas, and tools shaping how we make things. Each episode is a long, unhurried conversation with a designer, engineer, founder, or researcher about how they actually work.",
    "We skip the press-release version of the story. Expect honest detours, half-finished experiments, and the lessons that only show up after something goes wrong.",
  ],
  hosts: [
    {
      name: "Maya Okafor",
      bio: "Maya is a product designer turned producer who has spent a decade building tools for creative teams. She leads the interviews and keeps asking the follow-up question.",
    },
    {
      name: "Daniel Reyes",
      bio: "Daniel is a software engineer and lifelong tinkerer. He digs into the technical detail and keeps every episode grounded in how things really get built.",
    },
  ],
};
