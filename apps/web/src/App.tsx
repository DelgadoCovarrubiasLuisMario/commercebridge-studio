import { useState } from 'react';
import { AppShell, type AppTab } from './components/layout/AppShell';
import { Analytics } from './features/analytics/Analytics';
import { Dashboard } from './features/dashboard/Dashboard';
import { LeadsBoard } from './features/leads/LeadsBoard';
import { ProductTable } from './features/products/ProductTable';
import { StorefrontPreview } from './features/storefront/StorefrontPreview';
import { ThemeEditor } from './features/theme/ThemeEditor';

export function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'products' && <ProductTable />}
      {activeTab === 'storefront' && <StorefrontPreview />}
      {activeTab === 'leads' && <LeadsBoard />}
      {activeTab === 'theme' && <ThemeEditor />}
      {activeTab === 'analytics' && <Analytics />}
    </AppShell>
  );
}
