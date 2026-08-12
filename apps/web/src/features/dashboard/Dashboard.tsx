import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { ArrowUpRight, PackageCheck, ShoppingBag, UsersRound, WandSparkles } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { api } from '../../lib/api';
import { currency } from '../../lib/utils';

export function Dashboard() {
  const productsQuery = useQuery({ queryKey: ['products'], queryFn: () => api.products() });
  const leadsQuery = useQuery({ queryKey: ['leads'], queryFn: api.leads });
  const themeQuery = useQuery({ queryKey: ['theme'], queryFn: api.theme });

  const products = productsQuery.data ?? [];
  const leads = leadsQuery.data ?? [];
  const totalValue = products.reduce((sum, product) => sum + product.price * product.inventoryQuantity, 0);
  const activeProducts = products.filter((product) => product.status === 'active').length;
  const apiError = productsQuery.error ?? leadsQuery.error ?? themeQuery.error;

  const metrics = [
    { label: 'Catalog value', value: currency(totalValue), icon: ShoppingBag },
    { label: 'Active products', value: activeProducts.toString(), icon: PackageCheck },
    { label: 'Customer leads', value: leads.length.toString(), icon: UsersRound },
    { label: 'Theme previews', value: 'Liquid-ready', icon: WandSparkles }
  ];

  return (
    <div className="space-y-6">
      {apiError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{apiError.message}</p>
      ) : null}
      <section className="gradient-card overflow-hidden rounded-2xl p-7 sm:p-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-3xl">
          <Badge className="bg-white/10 text-white ring-1 ring-white/20">{themeQuery.data?.announcement ?? 'Demo storefront'}</Badge>
          <h1 className="cb-display mt-5 text-4xl font-bold tracking-tight md:text-6xl">{themeQuery.data?.heroTitle ?? 'Launch-ready storefronts'}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#f3d9e6] md:text-lg">{themeQuery.data?.heroSubtitle ?? 'Manage products, leads and Liquid-style sections from one retail ops desk.'}</p>
        </motion.div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div key={metric.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card>
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-700"><Icon className="h-5 w-5" /></div>
                  <ArrowUpRight className="h-5 w-5 text-slate-400" />
                </div>
                <p className="mt-5 text-3xl font-black text-slate-950">{metric.value}</p>
                <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardTitle>Catalog health</CardTitle>
          <CardDescription>Quick overview of publish readiness and stock status.</CardDescription>
          <div className="mt-6 space-y-4">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3">
                <img src={product.imageUrl} alt={product.title} className="h-14 w-14 rounded-2xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-950">{product.title}</p>
                  <p className="text-sm text-slate-500">{product.vendor} · {product.inventoryQuantity} units</p>
                </div>
                <Badge className={product.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}>{product.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>Lead pipeline</CardTitle>
          <CardDescription>Signals from client-facing forms.</CardDescription>
          <div className="mt-6 space-y-3">
            {leads.slice(0, 4).map((lead) => (
              <div key={lead.id} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">{lead.fullName}</p>
                    <p className="text-sm text-slate-500">{lead.company ?? 'Independent brand'}</p>
                  </div>
                  <Badge>{lead.status}</Badge>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">{lead.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
