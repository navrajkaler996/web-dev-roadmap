export const topics = [
  {
    id: 0,
    title: "Basics of web",
    description:
      "Before learning web development i.e. developing websites or web applications, you need to understand what is web and how it works.",
    started: true,
    completed: false,
    topics: [
      {
        name: "How internet works?",
        level: "red",
      },
      {
        name: "What is HTTP/HTTPS?",
        level: "red",
      },
      {
        name: "How browsers work?",
        level: "red",
      },
      {
        name: "What is web hosting?",
        level: "red",
      },
      {
        name: "What is DNS and how it works",
        level: "yellow",
      },
    ],
    totalTopics: 16,
    essentialTopics: 7,
  },
  {
    id: 1,
    title: "HTML",
    description:
      "HTML is the foundation of creating web pages. Imagine it as the skeleton of a website that defines the structure and content.",
    started: false,
    completed: false,
    totalTopics: 13,
    essentialTopics: 3,
  },
  {
    id: 2,
    title: "CSS",
    started: false,
    completed: false,
    totalTopics: 32,
    essentialTopics: 5,
  },
  {
    id: 3,
    title: "JavaScript",
    started: false,
    completed: false,
    totalTopics: 33,
    essentialTopics: 8,
  },
];
