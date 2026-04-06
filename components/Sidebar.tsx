import Link from 'next/link';
import { LayoutDashboard, PenSquare, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-muted/30 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-primary">promo.pikkto</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link
          href="/create"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <PenSquare className="w-4 h-4" />
          Create Content
        </Link>
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </div>
  );
}
