import { gql, request } from 'graphql-request';
export const v2API: string = 'https://api.nexusmods.com/v2/graphql';
const staticGames = 'https://data.nexusmods.com/file/nexus-data/games.json';

export interface IStaticGameEntry {
    id: number;
    name: string;
    name_lower: string;
    forum_url: string;
    nexusmods_url: string;
    genre: string;
    file_count: number;
    downloads: number;
    domain_name: string;
    approved_date: number;
    mods: number;
    collections: number;
    image?: string;
}

export async function getAllGames(): Promise<IStaticGameEntry[]> {
    try {
        const req = await fetch(staticGames);
        if (req.ok) {
            const list: IStaticGameEntry[] =  await req.json();
            return list.map(g => ({ image: `https://staticdelivery.nexusmods.com/Images/games/4_3/tile_${g.id}.jpg`,   ...g}))
            .sort((a,b) => a.downloads > b.downloads ? -1 : 1);
        }
        else throw new Error('Request failed: '+req.statusText);
    }
    catch(err) {
        console.error('Could not get game list', err);
        throw err;
    }
}

