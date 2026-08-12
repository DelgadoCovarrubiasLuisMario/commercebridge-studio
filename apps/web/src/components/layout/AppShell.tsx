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
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white/90 p-6 backdrop-blur xl:block">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">CB</div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Portfolio Project</p>
            <h1 className="font-black text-slate-950">CommerceBridge</h1>
          </div>
        </div>

        <nav className="mt-10 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition',
                  isActive ? 'text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'
                )}
              >
                {isActive && <motion.span layoutId="active-nav" className="absolute inset-0 rounded-2xl bg-slate-950" />}
                <Icon className="relative h-5 w-5" />
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="xl:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur xl:px-10">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm font-semibold text-orange-600">E-commerce operations dashboard</p>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">CommerceBridge Studio</h2>
            </div>
            <div className="flex gap-2 overflow-x-auto xl:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn('rounded-full px-4 py-2 text-sm font-semibold', activeTab === tab.id ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600')}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="hidden rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 xl:block">
              React · Node · MySQL · Liquid
            </div>
          </div>
        </header>
        <div className="p-5 xl:p-10">{children}</div>
      </main>
    </div>
  );
}
