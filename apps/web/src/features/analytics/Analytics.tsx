import { useQuery } from '@tanstack/react-query';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { api } from '../../lib/api';
import { currency } from '../../lib/utils';

export function Analytics() {
  const productsQuery = useQuery({ queryKey: ['products'], queryFn: () => api.products() });
  const leadsQuery = useQuery({ queryKey: ['leads'], queryFn: api.leads });
  const products = productsQuery.data ?? [];
  const leads = leadsQuery.data ?? [];
  const productTypes = [...new Set(products.map((product) => product.productType))];
  const maxStock = Math.max(1, ...products.map((product) => product.inventoryQuantity));

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <Card>
        <CardTitle>Inventory distribution</CardTitle>
        <CardDescription>Stock levels across the active catalog.</CardDescription>
        <div className="mt-6 space-y-4">
          {products.map((product) => (
            <div key={product.id}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">{product.title}</span>
                <span className="text-slate-500">{product.inventoryQuantity} units</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-slate-950" style={{ width: `${(product.inventoryQuantity / maxStock) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Business summary</CardTitle>
        <CardDescription>Catalog health and lead pipeline at a glance.</CardDescription>
        <div className="mt-6 grid gap-3">
          <Summary label="Product types" value={productTypes.length.toString()} />
          <Summary label="Potential stock value" value={currency(products.reduce((sum, product) => sum + product.price * product.inventoryQuantity, 0))} />
          <Summary label="Average product price" value={currency(products.reduce((sum, product) => sum + product.price, 0) / Math.max(products.length, 1))} />
          <Summary label="Lead conversion candidates" value={leads.filter((lead) => ['quoted', 'won'].includes(lead.status)).length.toString()} />
        </div>
      </Card>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
    </div>
  );
}
