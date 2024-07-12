import { PaginationControls } from '@/components/tools/pagination-controls';
import { paginatePoliticians } from '@/server/actions/politician/paginate.action';
import { paginatePoliticiansParamsSchema } from '@/server/actions/politician/politician.types';

export default async function Page({ searchParams }: ServerComponentPageProps) {
  const paramsResult = await paginatePoliticiansParamsSchema.safeParseAsync(
    searchParams
  );

  if (!paramsResult.success) return <h1>Invalid Params</h1>;

  const { items, meta } = await paginatePoliticians(paramsResult.data);

  return (
    <div className="p-2 space-y-3">
      <h1>Politicos</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="w-full p-3 border rounded-md">
            {item.politician_name}
          </div>
        ))}
      </div>
      <PaginationControls
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
      />
    </div>
  );
}
