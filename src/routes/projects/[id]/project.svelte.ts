let activeFilePath = $state<string | null>(null);

export function getActiveFilePath() {
  return activeFilePath;
}

export function setActiveFilePath(path: string) {
  activeFilePath = path;
}
