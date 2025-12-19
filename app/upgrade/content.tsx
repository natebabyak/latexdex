"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Link from "next/link";

export function Content() {
  const [value, setValue] = useState("yearly");

  return (
    <div className="flex flex-col gap-4">
      <Tabs onValueChange={setValue} value={value} className="mx-auto">
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-4 px-4">
        <Link
          href="/search"
          className="hover:border-primary cursor-pointer transition-all hover:shadow-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-normal">Free</CardTitle>
              <CardDescription className="text-xs">
                Basic access to LaTeXdex
              </CardDescription>
              <Button variant="outline">Use LaTeXdex for free</Button>
            </CardHeader>
            <Separator />
          </Card>
        </Link>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between"></div>
            <CardTitle className="text-2xl font-normal">Pro</CardTitle>
            <CardDescription className="text-xs">
              For professionals and enthusiasts
            </CardDescription>
            <div>
              <span className="text-2xl">
                ${value === "monthly" ? "5" : "50"}
              </span>
              <span className="text-muted-foreground text-sm">
                {value === "monthly" ? "/mo" : "/yr"}
              </span>
            </div>
            <Button>Get LaTeXdex Pro</Button>
          </CardHeader>
          <Separator />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-normal">Max</CardTitle>
            <CardDescription className="text-xs">
              For developers and enterprises
            </CardDescription>
            <div>
              <span className="text-2xl">
                ${value === "monthly" ? "25" : "250"}
              </span>
              <span className="text-muted-foreground text-sm">
                {value === "monthly" ? "/mo" : "/yr"}
              </span>
            </div>
            <Button>Get LaTeXdex Max</Button>
          </CardHeader>
          <Separator />
        </Card>
      </div>
    </div>
  );
}
