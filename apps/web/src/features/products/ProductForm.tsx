import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/Input';
import { api } from '../../lib/api';

const productFormSchema = z.object({
  title: z.string().min(3, 'Enter at least 3 characters'),
  description: z.string().min(10, 'Describe the product clearly'),
  vendor: z.string().min(2),
  productType: z.string().min(2),
  price: z.coerce.number().positive(),
  compareAtPrice: z.coerce.number().positive().nullable().optional(),
  inventoryQuantity: z.coerce.number().int().min(0),
  status: z.enum(['draft', 'active', 'archived']),
  imageUrl: z.string().url(),
  tags: z.string()
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export function ProductForm() {
  const queryClient = useQueryClient();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      description: '',
      vendor: '',
      productType: '',
      price: 299,
      compareAtPrice: null,
      inventoryQuantity: 10,
      status: 'draft',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      tags: 'new, launch'
    }
  });

  const mutation = useMutation({
    mutationFn: api.createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      form.reset();
    }
  });

  const errors = form.formState.errors;

  return (
    <Card>
      <CardTitle>Create product</CardTitle>
      <CardDescription>Validated admin form connected to the API and MySQL.</CardDescription>
      <form className="mt-6 grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
        <Input placeholder="Product title" {...form.register('title')} />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
        <Textarea placeholder="Product description" {...form.register('description')} />
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Vendor" {...form.register('vendor')} />
          <Input placeholder="Product type" {...form.register('productType')} />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Input type="number" placeholder="Price" {...form.register('price')} />
          <Input type="number" placeholder="Compare at price" {...form.register('compareAtPrice', { setValueAs: (value) => value === '' ? null : Number(value) })} />
          <Input type="number" placeholder="Stock" {...form.register('inventoryQuantity')} />
        </div>
        <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" {...form.register('status')}>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        <Input placeholder="Image URL" {...form.register('imageUrl')} />
        <Input placeholder="Tags" {...form.register('tags')} />
        {mutation.error && <p className="text-sm text-red-600">{mutation.error.message}</p>}
        <Button disabled={mutation.isPending} type="submit"><Save className="h-4 w-4" /> Save product</Button>
      </form>
    </Card>
  );
}
