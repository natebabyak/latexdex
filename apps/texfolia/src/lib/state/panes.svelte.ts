interface Tab {
  id: string;
  filePath: string;
  type: "input" | "output";
}

export interface Pane {
  id: string;
  tabs: Tab[];
  activeTabId: string;
}

let panes = $state<Pane[]>([]);

export function getPanes() {
  return panes;
}
