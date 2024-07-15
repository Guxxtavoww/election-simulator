import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
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
    <div className="p-2 space-y-3 flex flex-col justify-between h-svh">
      <h1>Politicos</h1>
      <ScrollArea className="flex-[1]">
        {items.map((item) => (
          <div key={item.id} className="w-full p-3 border rounded-md mb-4 last:mb-0">
            <Image
              src={item.politician_photo_url}
              alt={item.politician_name}
              width={70}
              height={70}
            />
            {item.politician_name}
          </div>
        ))}
      </ScrollArea>
      <PaginationControls
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
        itemsPerPage={meta.itemsPerPage}
      />
    </div>
  );
}
