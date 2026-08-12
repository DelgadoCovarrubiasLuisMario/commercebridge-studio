import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Input, Textarea } from '../../components/ui/Input';
import { api } from '../../lib/api';

const leadSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  company: z.string().nullable(),
  message: z.string().min(10),
  budget: z.string().min(2)
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function LeadForm() {
  const queryClient = useQueryClient();
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      message: '',
      budget: '$15,000 - $25,000 MXN'
    }
  });

  const mutation = useMutation({
    mutationFn: api.createLead,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['leads'] });
      form.reset();
    }
  });

  return (
    <Card>
      <CardTitle>Client inquiry form</CardTitle>
      <CardDescription>Shows form/database integration for client-facing web projects.</CardDescription>
      <form className="mt-6 grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
        <Input placeholder="Full name" {...form.register('fullName')} />
        <Input placeholder="Email" {...form.register('email')} />
        <Input placeholder="Company" {...form.register('company', { setValueAs: (value) => value || null })} />
        <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none" {...form.register('budget')}>
          <option>$8,000 - $15,000 MXN</option>
          <option>$15,000 - $25,000 MXN</option>
          <option>$25,000+ MXN</option>
        </select>
        <Textarea placeholder="What do you need for your store?" {...form.register('message')} />
        {mutation.error && <p className="text-sm text-red-600">{mutation.error.message}</p>}
        {mutation.isSuccess && <p className="text-sm font-semibold text-emerald-700">Lead saved successfully.</p>}
        <Button type="submit" disabled={mutation.isPending}><Send className="h-4 w-4" /> Submit lead</Button>
      </form>
    </Card>
  );
}
