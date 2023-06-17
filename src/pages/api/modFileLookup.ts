// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { modFileLookup } from '@/util/NexusMods/nexusapi';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const apikey = req.headers['apikey'];
    if (!apikey || typeof apikey !== 'string') {
        res.statusCode = 400;
        return res.send({ data: 'Please provide an API key' } as any);
    }

    const { domain, id } = req.query;

    if (!domain || !id) return res.status(401).json({ error: 'Invalid Mod ID or Game Domain' } as any);

    try {
        const search = await modFileLookup(domain as string, parseInt(id as string), apikey as string);
        return res.send(search as any);
    }
    catch(err) {
        const errResp = err as Response;
        console.log('Failed to validate API key', { response: errResp.status, err })
        if (!errResp?.status) return res.status(500).json({ error: 'Nexus Mods API response error' } as any);
        res.statusMessage = errResp.statusText;
        return res.status(errResp.status).json({ error: errResp.statusText } as any);
    }
}