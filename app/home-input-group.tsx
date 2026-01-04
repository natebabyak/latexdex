"use client";

import { ModifierKbd } from "@/components/modifier-kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function HomeInputGroup() {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const route = `/search?q=${e.currentTarget.value}`;
    router.replace(route);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="mx-auto w-full max-w-sm">
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." ref={inputRef} />
        <InputGroupAddon align="inline-end">
          <KbdGroup>
            <ModifierKbd />
            <Kbd>K</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
