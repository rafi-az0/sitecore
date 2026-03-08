import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

interface NavbarProps {
  onNewPost: () => void;
}

export function Navbar({ onNewPost }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-semibold text-neutral-50 tracking-tight hover:text-violet-400 transition-colors"
        >
          Folio
        </Link>
        <Button variant="primary" size="sm" onClick={onNewPost}>
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>
    </header>
  );
}
