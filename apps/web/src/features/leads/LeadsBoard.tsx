import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge } from '../../components/ui/Badge';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { QueryState } from '../../components/QueryState';
import { api } from '../../lib/api';
import { shortDate } from '../../lib/utils';
import type { LeadStatus } from '../../types';
import { LeadForm } from './LeadForm';

const statuses: LeadStatus[] = ['new', 'contacted', 'quoted', 'won', 'lost'];

export function LeadsBoard() {
  const queryClient = useQueryClient();
  const leadsQuery = useQuery({ queryKey: ['leads'], queryFn: api.leads });
  const leads = leadsQuery.data ?? [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: LeadStatus }) => api.updateLeadStatus(id, status),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <LeadForm />
      <Card>
        <CardTitle>Lead pipeline</CardTitle>
        <CardDescription>Kanban-style overview of customer requests captured from forms.</CardDescription>
        {statusMutation.error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{statusMutation.error.message}</p>
        ) : null}
        <div className="mt-6">
          <QueryState
            isLoading={leadsQuery.isLoading}
            isError={leadsQuery.isError}
            errorMessage={leadsQuery.error?.message}
            isEmpty={!leads.length}
            emptyMessage="No leads yet. Submit the capture form."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {statuses.map((status) => (
                <div key={status} className="rounded-3xl bg-slate-50 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-black capitalize text-slate-700">{status}</p>
                    <Badge>{leads.filter((lead) => lead.status === status).length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {leads
                      .filter((lead) => lead.status === status)
                      .map((lead) => (
                        <article key={lead.id} className="rounded-2xl bg-white p-4 shadow-sm shadow-slate-200/80">
                          <p className="font-bold text-slate-950">{lead.fullName}</p>
                          <p className="text-xs text-slate-500">{lead.company ?? lead.email}</p>
                          <p className="mt-3 line-clamp-3 text-sm text-slate-600">{lead.message}</p>
                          <p className="mt-3 text-xs font-semibold text-orange-600">{lead.budget}</p>
                          <p className="mt-1 text-xs text-slate-400">{shortDate(lead.createdAt)}</p>
                          <select
                            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs capitalize"
                            value={lead.status}
                            onChange={(event) =>
                              statusMutation.mutate({ id: lead.id, status: event.target.value as LeadStatus })
                            }
                          >
                            {statuses.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </article>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </Card>
    </div>
  );
}
