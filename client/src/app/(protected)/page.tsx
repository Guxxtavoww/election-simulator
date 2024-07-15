import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
import { listPoliticians } from '@/server/actions/politician/list.action';
import { listPoliticiansParamsSchema } from '@/server/actions/politician/politician.types';

export default async function Page({ searchParams }: ServerComponentPageProps) {
  const paramsResult = await listPoliticiansParamsSchema.safeParseAsync(
    searchParams
  );

  if (!paramsResult.success) return <h1>Invalid Params</h1>;

  const politicians = await listPoliticians(paramsResult.data);

  return (
    <div className="p-2 space-y-3 flex flex-col justify-between h-svh">
      <h1>Politicos</h1>
      <ScrollArea className="flex-[1]">
        {politicians.map((politician) => (
          <div
            key={politician.id}
            className="w-full p-3 border rounded-md mb-4 last:mb-0"
          >
            <Image
              src={politician.politician_photo_url}
              alt={politician.politician_name}
              width={70}
              height={70}
            />
            {politician.politician_name}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
