"use client";

import { useEffect, useState } from "react";
import { Kbd } from "@/components/ui/kbd";

export function ModifierKbd() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac/.test(navigator.userAgent));
  }, []);

  return <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>;
}
