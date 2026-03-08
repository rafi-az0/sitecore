import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./Navbar";

interface AppShellProps {
  onNewPost: () => void;
}

export function AppShell({ onNewPost }: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Navbar onNewPost={onNewPost} />
      <Outlet />
      <ScrollRestoration />
      <div id="modal-root" />
    </div>
  );
}
