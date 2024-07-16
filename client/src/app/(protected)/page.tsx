import { ScrollArea } from '@/components/ui/scroll-area';
import { listPoliticians } from '@/server/actions/politician/list.action';
import { listPoliticiansParamsSchema } from '@/server/actions/politician/politician.types';
import { PoliticianWidget } from './_components/politician-widget';

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
        {politicians.map((politician, idx) => (
          <PoliticianWidget {...politician} key={idx} />
        ))}
      </ScrollArea>
    </div>
  );
}
