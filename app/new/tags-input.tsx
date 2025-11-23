"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagsInput({ value, onChange }: TagsInputProps) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();

    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }

    setInput("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === " " || e.key === "Enter") && input.trim()) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        {value.map((tag) => (
          <Badge
            className="bg-blue-500 text-white dark:bg-blue-600"
            key={tag}
            onClick={() => removeTag(tag)}
          >
            {tag}
            <X />
          </Badge>
        ))}
      </InputGroupAddon>
      <InputGroupInput
        onChange={(e) => setInput(e.target.value)}
        placeholder="roots"
        type="text"
        value={input}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
}
