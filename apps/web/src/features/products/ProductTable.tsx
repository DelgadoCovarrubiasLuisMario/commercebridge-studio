import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { QueryState } from '../../components/QueryState';
import { api } from '../../lib/api';
import { currency } from '../../lib/utils';
import type { ProductStatus } from '../../types';
import { ProductForm } from './ProductForm';

const productStatuses: ProductStatus[] = ['draft', 'active', 'archived'];

export function ProductTable() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const productsQuery = useQuery({ queryKey: ['products', search], queryFn: () => api.products(search) });
  const products = productsQuery.data ?? [];

  const lowStock = useMemo(() => products.filter((product) => product.inventoryQuantity <= 10).length, [products]);

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: ProductStatus }) => api.updateProduct(id, { status }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Product catalog</CardTitle>
            <CardDescription>{products.length} products · {lowStock} low stock alerts</CardDescription>
          </div>
          <label className="relative block md:w-80">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input className="pl-10" placeholder="Search products" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
        </div>

        {statusMutation.error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{statusMutation.error.message}</p>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
          <QueryState
            isLoading={productsQuery.isLoading}
            isError={productsQuery.isError}
            errorMessage={productsQuery.error?.message}
            isEmpty={!products.length}
            emptyMessage="No products yet. Create one with the form."
          >
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="bg-white align-middle">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt={product.title} className="h-12 w-12 rounded-2xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-950">{product.title}</p>
                          <p className="text-xs text-slate-500">/{product.handle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{product.productType}</td>
                    <td className="px-4 py-4 font-semibold text-slate-950">{currency(product.price)}</td>
                    <td className="px-4 py-4">
                      <Badge className={product.inventoryQuantity <= 10 ? 'bg-red-100 text-red-700' : 'bg-slate-100'}>
                        {product.inventoryQuantity}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-semibold capitalize"
                        value={product.status}
                        onChange={(event) =>
                          statusMutation.mutate({ id: product.id, status: event.target.value as ProductStatus })
                        }
                      >
                        {productStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </QueryState>
        </div>
      </Card>

      <ProductForm />
    </div>
  );
}
