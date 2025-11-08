const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="w-full p-4">
      <p className="text-muted-foreground text-center text-sm">
        &copy; {year} Nate Babyak. All rights reserved.
      </p>
    </footer>
  );
}
