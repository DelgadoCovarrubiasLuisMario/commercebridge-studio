import { motion } from 'motion/react';
import { BarChart3, Boxes, GalleryHorizontalEnd, Inbox, LayoutDashboard, Store } from 'lucide-react';
import { cn } from '../../lib/utils';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Boxes },
  { id: 'storefront', label: 'Storefront', icon: Store },
  { id: 'leads', label: 'Leads', icon: Inbox },
  { id: 'theme', label: 'Theme', icon: GalleryHorizontalEnd },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 }
] as const;

export type AppTab = (typeof tabs)[number]['id'];

interface AppShellProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  children: React.ReactNode;
}

export function AppShell({ activeTab, onTabChange, children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[var(--cb-line)] bg-[var(--cb-panel)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--cb-accent)]">Merchandising desk</p>
              <h1 className="cb-display text-3xl font-bold tracking-tight text-[var(--cb-ink)] sm:text-4xl">CommerceBridge</h1>
            </div>
            <p className="max-w-sm text-sm text-[var(--cb-muted)]">
              Catalog, leads, theme and Liquid-style previews in one retail ops surface.
            </p>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1" aria-label="Sections">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    'relative inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition',
                    isActive ? 'text-white' : 'text-[var(--cb-muted)] hover:bg-white hover:text-[var(--cb-ink)]'
                  )}
                >
                  {isActive && <motion.span layoutId="cb-active-tab" className="absolute inset-0 rounded-full bg-[var(--cb-ink)]" />}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
