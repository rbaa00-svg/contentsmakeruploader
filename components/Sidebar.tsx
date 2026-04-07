'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Menu, PenSquare, Settings, X } from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/create', label: 'Create Content', icon: PenSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
];

function navItemClass(isActive: boolean) {
  return [
    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground',
  ].join(' ');
}

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header className="border-b bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold tracking-tight text-primary">promo.pikkto</p>
            <p className="text-xs text-muted-foreground">Promotion content workspace</p>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent"
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isMobileOpen ? (
          <nav className="mx-auto mt-4 flex max-w-6xl flex-col gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navItemClass(isActive)}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </header>

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r bg-muted/30 md:flex md:flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-primary">promo.pikkto</h1>
          <p className="mt-2 text-sm text-muted-foreground">Plan, generate, and schedule campaign content.</p>
        </div>
        <nav className="flex-1 space-y-2 px-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} className={navItemClass(isActive)}>
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
