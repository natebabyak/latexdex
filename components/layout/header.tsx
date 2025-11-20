import Link from "next/link";
import { AccountMenu } from "./account-menu";
import { Layers } from "lucide-react";
import { NavMenu } from "./nav-menu";

export function Header() {
  return (
    <header className="w-full p-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 xl:px-0">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Layers />
          </Link>
          <NavMenu />
        </div>
        <AccountMenu />
      </div>
    </header>
  );
}
