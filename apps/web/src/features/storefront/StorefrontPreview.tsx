import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Code2, Eye, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Textarea } from '../../components/ui/Input';
import { api } from '../../lib/api';
import { currency } from '../../lib/utils';

const defaultTemplate = `<article class="product-card">
  <p>{{ shop.name }}</p>
  <h3>{{ product.title }}</h3>
  <p>{{ product.description }}</p>
  <strong>{{ product.price | prepend: '$' }}</strong>
</article>`;

export function StorefrontPreview() {
  const [template, setTemplate] = useState(defaultTemplate);
  const productsQuery = useQuery({ queryKey: ['products'], queryFn: () => api.products() });
  const themeQuery = useQuery({ queryKey: ['theme'], queryFn: api.theme });
  const renderMutation = useMutation({ mutationFn: () => api.renderTemplate(template, productsQuery.data?.[0]?.id) });

  const products = productsQuery.data ?? [];
  const theme = themeQuery.data;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-200 p-6">
          <CardTitle>Storefront preview</CardTitle>
          <CardDescription>Preview storefront sections before you publish.</CardDescription>
        </div>
        <div className="bg-[#f5f1ea] p-6">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-900/10">
            <div className="bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white">{theme?.announcement ?? 'Launch promo active'}</div>
            <div className="grid gap-8 p-6 md:grid-cols-[1fr_0.9fr] md:p-10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-600">{theme?.storeName ?? 'Northline Goods'}</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{theme?.heroTitle ?? 'Launch-ready storefronts'}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{theme?.heroSubtitle ?? 'Preview product sections and forms before publishing.'}</p>
                <div className="mt-8 flex gap-3">
                  <Button>Shop collection</Button>
                  <Button variant="secondary">View lookbook</Button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="grid gap-4">
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex gap-4 rounded-3xl bg-slate-50 p-4">
                    <img src={product.imageUrl} alt={product.title} className="h-24 w-24 rounded-2xl object-cover" />
                    <div>
                      <p className="font-black text-slate-950">{product.title}</p>
                      <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
                      <p className="mt-2 font-black text-orange-600">{currency(product.price)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Liquid-style renderer</CardTitle>
            <CardDescription>Template sandbox connected to the API via LiquidJS.</CardDescription>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700"><Code2 className="h-5 w-5" /></div>
        </div>
        <Textarea className="mt-6 min-h-56 font-mono text-xs" value={template} onChange={(event) => setTemplate(event.target.value)} />
        <Button className="mt-4" onClick={() => renderMutation.mutate()} disabled={renderMutation.isPending}>
          {renderMutation.isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
          Render preview
        </Button>
        <div
          className="liquid-preview mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-700"
          dangerouslySetInnerHTML={{
            __html: renderMutation.data ?? '<p>Click “Render preview” to test the template.</p>'
          }}
        />
        {renderMutation.isError ? (
          <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{renderMutation.error.message}</p>
        ) : null}
        {productsQuery.isError ? (
          <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{productsQuery.error.message}</p>
        ) : null}
      </Card>
    </div>
  );
}
