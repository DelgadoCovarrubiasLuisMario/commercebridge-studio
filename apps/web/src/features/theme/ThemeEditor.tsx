import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Palette } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/Input';
import { api } from '../../lib/api';

const themeSchema = z.object({
  storeName: z.string().min(2),
  announcement: z.string().min(2),
  heroTitle: z.string().min(2),
  heroSubtitle: z.string().min(2),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/)
});

type ThemeFormValues = z.infer<typeof themeSchema>;

export function ThemeEditor() {
  const queryClient = useQueryClient();
  const themeQuery = useQuery({ queryKey: ['theme'], queryFn: api.theme });
  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      storeName: 'Northline Goods',
      announcement: 'Free local delivery on launch bundles',
      heroTitle: 'Launch-ready storefronts for modern brands',
      heroSubtitle: 'Preview products, forms and Liquid-style sections before publishing storefront changes.',
      primaryColor: '#111827',
      accentColor: '#f97316'
    }
  });

  useEffect(() => {
    if (themeQuery.data) {
      const { id: _id, ...theme } = themeQuery.data;
      form.reset(theme);
    }
  }, [form, themeQuery.data]);

  const mutation = useMutation({
    mutationFn: api.updateTheme,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['theme'] });
    }
  });

  const current = form.watch();

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardTitle>Theme settings</CardTitle>
        <CardDescription>Edit brand copy and colors stored through the API.</CardDescription>
        <form className="mt-6 grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Input placeholder="Store name" {...form.register('storeName')} />
          <Input placeholder="Announcement" {...form.register('announcement')} />
          <Input placeholder="Hero title" {...form.register('heroTitle')} />
          <Textarea placeholder="Hero subtitle" {...form.register('heroSubtitle')} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input type="color" {...form.register('primaryColor')} />
            <Input type="color" {...form.register('accentColor')} />
          </div>
          {mutation.error && <p className="text-sm text-red-600">{mutation.error.message}</p>}
          {mutation.isSuccess && <p className="text-sm font-semibold text-emerald-700">Theme saved.</p>}
          <Button type="submit" disabled={mutation.isPending}><Palette className="h-4 w-4" /> Save theme</Button>
        </form>
      </Card>

      <Card>
        <CardTitle>Live brand card</CardTitle>
        <CardDescription>Small visual system preview from stored settings.</CardDescription>
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
          <div className="px-5 py-3 text-center text-sm font-bold text-white" style={{ backgroundColor: current.primaryColor }}>{current.announcement}</div>
          <div className="p-8">
            <div className="inline-flex rounded-full px-3 py-1 text-xs font-black text-white" style={{ backgroundColor: current.accentColor }}>{current.storeName}</div>
            <h3 className="mt-5 text-4xl font-black tracking-tight text-slate-950">{current.heroTitle}</h3>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">{current.heroSubtitle}</p>
            <div className="mt-8 h-3 rounded-full" style={{ background: `linear-gradient(90deg, ${current.primaryColor}, ${current.accentColor})` }} />
          </div>
        </div>
      </Card>
    </div>
  );
}
