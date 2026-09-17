export interface ProjectItem {
  id: string;
  name: string;
  category?: string;
  stage: "Archive" | "Workshop" | "Forge" | "Lens";
  updated: string;
  progress: number;
}

export const ARCHIVE_PROJECTS: ProjectItem[] = [
  {
    id: "black-holes",
    name: "The Physics of Black Holes & Spacetime",
    category: "Astrophysics & Cosmology",
    stage: "Workshop",
    updated: "2 hours ago",
    progress: 75,
  },
  {
    id: "ai-healthcare",
    name: "AI Ethics & Diagnostic Bias in Healthcare",
    category: "Technology & Medicine",
    stage: "Lens",
    updated: "Yesterday",
    progress: 95,
  },
  {
    id: "roman-republic",
    name: "The Fall of the Roman Republic: From Caesar to Empire",
    category: "Ancient History & Politics",
    stage: "Forge",
    updated: "Today",
    progress: 60,
  },
  {
    id: "crispr-genetics",
    name: "How CRISPR-Cas9 is Rewriting the Code of Life",
    category: "Biotechnology & Genetics",
    stage: "Archive",
    updated: "2 days ago",
    progress: 40,
  },
  {
    id: "habit-psychology",
    name: "The Neuroscience of Habit Formation & Dopamine Loops",
    category: "Behavioral Psychology",
    stage: "Workshop",
    updated: "3 days ago",
    progress: 50,
  },
];
