type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
};

export function QueryState({
  isLoading,
  isError,
  errorMessage = 'API unavailable. Start the CommerceBridge API on port 4100.',
  isEmpty = false,
  emptyMessage = 'No items yet.',
  children
}: QueryStateProps) {
  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading…</p>;
  }

  if (isError) {
    return <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>;
  }

  if (isEmpty) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return <>{children}</>;
}
