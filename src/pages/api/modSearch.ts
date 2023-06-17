// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { modSearch } from '@/util/NexusMods/nexusapi';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { term, gameId } = req.query;
    if (!term) return res.status(200).json([] as any);
    const gameNumericalId = gameId ? parseInt(gameId as string) : 0
    const gameFilter = !isNaN(gameNumericalId) && gameNumericalId > 0 ? gameNumericalId : undefined;
    const apikey = req.headers['apikey'];

    if (!apikey || typeof apikey !== 'string') {
        res.statusCode = 400;
        return res.send({ data: 'Please provide an API key' } as any);
    }
    try {
        const srch = await modSearch(term as string, apikey, gameFilter);
        return res.send(srch as any);
    }
    catch(err) {
        return res.status(500).json({ error: 'Nexus Mods API response error' } as any);
    }
}