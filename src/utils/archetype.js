const ARCHETYPES = [
  {
    id: "star-magnet",
    title: "The Star Magnet",
    emoji: "✨",
    description: "People find your repos and immediately smash that star button. Certified quality (or certified viral README).",
    matches: (s) => s.totalStars >= 50,
  },
  {
    id: "notebook-wizard",
    title: "The Notebook Wizard",
    emoji: "🧙",
    description: "Python is your love language. Somewhere there's a .ipynb with 200 unnamed cells and you know exactly what they do.",
    matches: (s) => s.topLanguage?.language === "Python",
  },
  {
    id: "frontend-goblin",
    title: "Frontend Chaos Goblin",
    emoji: "🧌",
    description: "You've npm installed things you don't remember installing. Your node_modules folder has its own gravitational pull.",
    matches: (s) => ["JavaScript", "TypeScript", "Vue", "HTML"].includes(s.topLanguage?.language) && s.ownRepoCount >= 5,
  },
  {
    id: "serial-forker",
    title: "The Serial Forker",
    emoji: "🍴",
    description: "More forks than original repos. You collect other people's cool projects like Pokémon cards — respectable strategy.",
    matches: (s) => s.forkedRepoCount > s.ownRepoCount && s.forkedRepoCount >= 3,
  },
  {
    id: "main-character",
    title: "Certified Internet Main Character",
    emoji: "🌟",
    description: "Your follower count is doing numbers. People are watching your commits like it's a TV show.",
    matches: (s) => s.user.followers >= 100,
  },
  {
    id: "speedrunner",
    title: "The Speedrunner Dev",
    emoji: "⚡",
    description: "New account, already shipping. You joined GitHub and immediately started grinding out repos like it's a race.",
    matches: (s) => s.accountAgeYears < 1 && s.ownRepoCount >= 8,
  },
  {
    id: "ancient-one",
    title: "The Ancient But Mysterious One",
    emoji: "🗿",
    description: "You've been on GitHub since before it was cool to be on GitHub. Few repos, maximum lore.",
    matches: (s) => s.accountAgeYears >= 6 && s.ownRepoCount <= 10,
  },
  {
    id: "systems-gremlin",
    title: "The Systems Gremlin",
    emoji: "🛠️",
    description: "Rust, Go, or C — you live where the compiler yells at you and you enjoy it. Memory safety is a lifestyle.",
    matches: (s) => ["Rust", "Go", "C", "C++"].includes(s.topLanguage?.language),
  },
  {
    id: "backend-monk",
    title: "The Backend Monk",
    emoji: "🧘",
    description: "No flashy UI, no drama — just clean APIs and quiet competence. You debug in silence and it is beautiful.",
    matches: (s) => ["Java", "Kotlin", "C#", "PHP", "Ruby"].includes(s.topLanguage?.language),
  },
  {
    id: "chaotic-neutral",
    title: "Chaotic Neutral Coder",
    emoji: "🎲",
    description: "Your repos span at least four unrelated topics and zero of them have a README. We respect the chaos.",
    matches: () => true,
  },
];

export function computeArchetype(stats) {
  return ARCHETYPES.find((archetype) => archetype.matches(stats));
}
